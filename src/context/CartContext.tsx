import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import type { CartItem, Customization } from "../types/models";

// ─── State ───────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

// ─── Actions ─────────────────────────────────────────────────────────────────

type Action =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i,
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    case "UPDATE_QTY":
      if (action.payload.quantity < 1) {
        return { items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i,
        ),
      };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * Builds a collision-safe, stable cart item id from product + variant +
 * boatName + templateId.
 *
 * Uses JSON.stringify of a fixed-length tuple so that any characters inside
 * the values can never collide with the separator.
 * boatName is normalized (trimmed, lowercased) so "My Boat" and " my boat "
 * resolve to the same cart entry.
 * templateId is included because it is now user-selectable; the same
 * product/variant/boatName with a different template produces a distinct
 * customized item and must not silently merge (which would discard one
 * template choice and just bump the quantity).
 */
function buildCartItemId(
  productId: number,
  variantId?: number,
  customization?: Customization,
): string {
  const boatName = customization?.boatName?.trim().toLowerCase() ?? "";
  const templateId = customization?.templateId ?? "classic-text";
  return JSON.stringify([productId, variantId ?? null, boatName, templateId]);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    const id = buildCartItemId(
      item.productId,
      item.variantId,
      item.customization,
    );
    dispatch({ type: "ADD_ITEM", payload: { ...item, id } });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  }, []);

  const updateQty = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [state.items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateQty,
      clearCart,
    }),
    [
      state.items,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateQty,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

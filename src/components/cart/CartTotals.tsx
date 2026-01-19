import { Card, CardTitle } from "../ui/card";
import { formatCurrency } from "@/utils/format";
import { Separator } from "@radix-ui/react-dropdown-menu";
import FormContainer from "../form/FormContainer";
import { createOrderAction } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";
import { Cart } from "@/utils/types";

const CartTotals = ({ cart }: { cart: Cart }) => {
  const { cartTotal, orderTotal, shipping, tax } = cart;

  return (
    <div>
      <Card className="p-8">
        <CartTotalRow label="SubTotal" amount={cartTotal} />
        <CartTotalRow label="Shipping" amount={shipping} />
        <CartTotalRow label="Tax" amount={tax} />
        <CardTitle className="mt-8">
          <CartTotalRow label="Order Total" amount={orderTotal} lastRow />
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton text="Place Order" className="w-full mt-8" />
      </FormContainer>
    </div>
  );
};

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
}

export default CartTotals;

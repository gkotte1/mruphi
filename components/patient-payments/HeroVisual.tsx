import { Icon } from "@/components/icons";
import {
  Amount,
  Bubble,
  MethodTile,
  PhoneFrame,
  Row,
  Run,
  Surface,
} from "@/components/patient-payments/Pay";

/**
 * The hero visual: the $84 balance, from the text to the ledger.
 *
 * It used to be a message card stacked on a card of values, which showed the
 * two ends and nothing in between. It now follows the headline exactly — the
 * text arrives on the patient's own phone, the tap happens on a payment
 * surface, and the paid balance lands reconciled in the ledger.
 *
 * Every string is the one the page already carried.
 */
export default function PaymentJourney() {
  return (
    <div className="relative">
      {/* Text — on the phone already in their hand. */}
      <PhoneFrame label="Patient’s Phone · Messages">
        <Bubble side="in">
          Your balance is $84.00. Tap here to securely pay: murphi.pay/x82f
        </Bubble>
        <Bubble side="out">Paid ✓</Bubble>
      </PhoneFrame>

      <Run />

      {/* Tap — the surface the balance is actually settled on. */}
      <Surface
        label={
          <>
            <Icon name="card" width={13} height={13} className="shrink-0" />
            <span className="truncate">Secure Payment</span>
          </>
        }
        status="Paid"
        tone="brand"
        className="relative z-20"
      >
        <Amount value="$84.00" caption="Amount" />

        <div className="mt-4 grid grid-cols-3 gap-2 max-600:grid-cols-1">
          <MethodTile name="ACH" />
          <MethodTile name="Debit Card" selected />
          <MethodTile name="Credit Card" />
        </div>
      </Surface>

      <Run label="Payment confirmed → ledger updated" />

      {/* Paid — recorded where the balance came from. */}
      <div className="relative z-10 mx-auto w-[90%] max-600:w-full">
        <Surface label="EHR · Patient Ledger" status="Reconciled">
          <Row label="Balance Status" value="Outstanding → Paid" />
          <Row label="Method" value="Debit Card" />
          <Row label="Amount" value="$84.00" />
        </Surface>
      </div>
    </div>
  );
}

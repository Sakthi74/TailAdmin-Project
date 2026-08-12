import PaymentMethodCard from "./PaymentMethodCard";
import mastercard from "../../../assets/mastercard2.jpg";
import visa from "../../../assets/visa.jpg";
import Paypal from "../../../assets/paypal.jpg";

const PaymentMethods = () => {
  return (
    <div
      className="
        w-full rounded-2xl
        border border-border
        bg-card
        text-foreground
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-col gap-4
          border-b border-border
          p-5 w-full
          sm:flex-row sm:items-center
          sm:justify-between
        "
      >
        <h2 className="text-sm font-semibold text-foreground sm:text-base">
          Payment Methods
        </h2>

        <button
          className="
            flex h-10 w-full items-center justify-center gap-2
            rounded-lg border border-border
            bg-background px-4
            text-sm font-medium text-foreground
            hover:bg-muted
            sm:w-auto
          "
        >
          <span className="text-lg">+</span>
          Add New Card
        </button>
      </div>

      {/* Cards */}
      <div
        className="
          grid grid-cols-1 gap-4 p-5
          lg:grid-cols-3 md:grid-cols-2
        "
      >
        <PaymentMethodCard
          name="Mastercard"
          image={mastercard}
          cardNumber="**** **** **** 9029"
          expiry="01/24"
          isDefault={true}
          showEdit={true}
          showDelete={true}
          onEdit={() => console.log("Edit Mastercard")}
          onDelete={() => console.log("Delete Mastercard")}
        />

        <PaymentMethodCard
          name="Visa"
          image={visa}
          cardNumber="**** **** **** 4328"
          expiry="01/25"
          showMakeDefault={true}
          showEdit={true}
          showDelete={true}
          onMakeDefault={() => console.log("Make Visa default")}
          onEdit={() => console.log("Edit Visa")}
          onDelete={() => console.log("Delete Visa")}
        />

        <PaymentMethodCard
          name="Paypal"
          image={Paypal}
          email="name@example.com"
          showMakeDefault={true}
          showEdit={true}
          showDelete={true}
          onMakeDefault={() => console.log("Make Paypal default")}
          onEdit={() => console.log("Edit Paypal")}
          onDelete={() => console.log("Delete Paypal")}
        />
      </div>
    </div>
  );
};

export default PaymentMethods;

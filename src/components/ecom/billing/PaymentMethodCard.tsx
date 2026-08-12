import { Button } from "../../../ui/button";

interface PaymentMethodCardProps {
  name: string;

  image?: string;

  cardNumber?: string;
  expiry?: string;
  email?: string;

  isDefault?: boolean;

  showMakeDefault?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;

  onMakeDefault?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PaymentMethodCard = ({
  name,
  image = "",
  cardNumber,
  expiry,
  email,

  isDefault = false,

  showMakeDefault = false,
  showEdit = false,
  showDelete = false,

  onMakeDefault,
  onEdit,
  onDelete,
}: PaymentMethodCardProps) => {
  return (
    <div
      className="
        flex w-full min-w-0 flex-col gap-4
        rounded-xl border border-border
        bg-card p-3
        text-foreground
        transition-colors
        sm:p-4
      "
    >
      {/* Top content */}
      <div className="flex min-w-0 items-start gap-4">
        {/* Logo / Image */}
        <div
          className="
            flex h-12 w-12 shrink-0 items-center justify-center
            rounded-lg border border-border
            bg-background
          "
        >
          {image ? (
            <img src={image} alt={name} className="h-8 w-8 object-contain" />
          ) : (
            <span className="text-xs text-muted-foreground"></span>
          )}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          {/* Name + Default */}
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {name}
            </h3>

            {isDefault && (
              <span
                className="
                  shrink-0 rounded-full
                  bg-green-50 px-2 py-0.5
                  text-xs font-medium text-green-600
                  dark:bg-green-500/10 dark:text-green-400
                "
              >
                ✓ Default
              </span>
            )}
          </div>

          {/* Card information */}
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            {cardNumber && (
              <span className="text-xs text-muted-foreground">
                {cardNumber}
              </span>
            )}

            {expiry && (
              <span className="text-xs text-muted-foreground">
                Expiry {expiry}
              </span>
            )}

            {email && (
              <span className="truncate text-xs text-muted-foreground">
                {email}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {(showMakeDefault || showEdit || showDelete) && (
        <div className="flex flex-wrap items-center gap-2 pl-0 sm:pl-16">
          {showMakeDefault && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onMakeDefault}
              className="
                h-8 rounded-md
                border-border
                bg-background
                px-3 text-xs
                text-foreground
                hover:bg-muted
              "
            >
              Make Default
            </Button>
          )}

          {showEdit && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="
                h-8 rounded-md
                border-border
                bg-background
                px-3 text-xs
                text-foreground
                hover:bg-muted
              "
            >
              Edit
            </Button>
          )}

          {showDelete && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="
                h-8 rounded-md
                border-border
                bg-background
                px-3 text-xs
                text-foreground
                hover:bg-muted
              "
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;

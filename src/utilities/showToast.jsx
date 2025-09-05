import { toast } from "react-hot-toast";

/**
 * Displays a custom styled toast notification.
 *
 * @param {"success" | "error"} type - Type of the toast.
 * @param {string} message - The message to display in the toast.
 * @param {string} [icon] - Optional URL/path to an icon image.
 */
const showToast = (type, message, icon) => {
  const toastStyles = {
    border: "0.5px solid #242424",
    padding: "14px",
    background: "#040404",
    color: "#f9f9f9",
    display: "flex",
    alignItems: "center",
  };
  // Here is a comment

  const iconElement = icon ? (
    <img src={icon} alt="toast-icon" className="h-[28px] mr-3" />
  ) : null;

  const content = (
    <div style={{ display: "flex", alignItems: "center" }}>
      {iconElement}
      <span>{message}</span>
    </div>
  );

  const options = {
    duration: type === "error" ? 10000 : 5000, // ✅ fixed your comment (not 1000000ms)
    style: toastStyles,
    icon: icon ? null : undefined, // 🔑 removes default icon if custom provided
  };

  if (type === "error") {
    toast.error(content, options);
  } else if (type === "success") {
    toast.success(content, options);
  }
};

export default showToast;

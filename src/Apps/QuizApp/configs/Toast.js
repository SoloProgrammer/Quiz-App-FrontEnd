import { toast } from "react-hot-toast";

export function showToast(type, msg, duration, icon) {
    const toastId = toast(msg, {
        type: type,
        duration,
        position: 'top-center',

        // Styling
        style: {
            fontFamily: 'roboto'
        },

        // Custom Icon
        icon: icon,
    });
    return toastId
}
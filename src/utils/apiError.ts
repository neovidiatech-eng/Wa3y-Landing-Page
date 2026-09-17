export interface ApiErrorDetail {
  message: string;
  errors?: string[];
}

/**
 * Helper to extract error message and array of validation errors from Axios or API error response.
 */
export function parseApiError(
  err: any,
  fallbackMessage: string = "حدث خطأ أثناء تنفيذ الطلب. يرجى المحاولة مرة أخرى."
): ApiErrorDetail {
  if (!err) {
    return { message: fallbackMessage };
  }

  let data = err?.response?.data || err?.data || err?.response;
  
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (e) {}
  }

  if (!data || typeof data !== "object") {
    return { message: err?.message || fallbackMessage };
  }

  let message = fallbackMessage;
  
  // Recursively find the most meaningful string
  const findString = (obj: any): string | null => {
    if (typeof obj === "string" && obj.toLowerCase() !== "error" && obj.trim() !== "") return obj;
    if (obj && typeof obj === "object") {
      if (obj.error && typeof obj.error === "string" && obj.error.toLowerCase() !== "error") return obj.error;
      if (obj.message && typeof obj.message === "string" && obj.message.toLowerCase() !== "error") return obj.message;
      if (obj.error) return findString(obj.error);
      if (obj.message) return findString(obj.message);
    }
    return null;
  };

  const foundMessage = findString(data);
  if (foundMessage) {
    message = foundMessage;
  } else if (err.message && typeof err.message === "string") {
    message = err.message;
  } else if (data) {
    message = typeof data === "string" ? data : JSON.stringify(data);
  }
  const errors: string[] = [];

  if (Array.isArray(data.errors)) {
    data.errors.forEach((item: any) => {
      if (typeof item === "string" && item.trim()) {
        errors.push(item);
      } else if (item && typeof item === "object") {
        if (item.message) errors.push(String(item.message));
        else if (item.msg) errors.push(String(item.msg));
        else if (item.error) errors.push(String(item.error));
        else errors.push(JSON.stringify(item));
      }
    });
  } else if (data.errors && typeof data.errors === "object") {
    Object.values(data.errors).forEach((val: any) => {
      if (typeof val === "string" && val.trim()) {
        errors.push(val);
      } else if (Array.isArray(val)) {
        val.forEach((subVal: any) => {
          if (typeof subVal === "string" && subVal.trim()) errors.push(subVal);
          else if (subVal?.message) errors.push(String(subVal.message));
        });
      }
    });
  } else if (typeof data.errors === "string" && data.errors.trim()) {
    errors.push(data.errors);
  }

  return {
    message,
    errors: errors.length > 0 ? errors : undefined,
  };
}

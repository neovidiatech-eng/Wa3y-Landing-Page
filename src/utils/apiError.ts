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

  const data = err?.response?.data;
  if (!data) {
    return { message: err?.message || fallbackMessage };
  }

  const message = data.message || data.error || err.message || fallbackMessage;
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

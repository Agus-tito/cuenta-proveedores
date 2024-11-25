
// Ver comprobantes
export const getComprobante = async (token: any) => {
  try {
    const response = await fetch(
      "https://cuenta-proveedores.up.railway.app/api/comprobantes/mostrar",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los comprobantes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener comprobantes:", error);
  }
};

// Crear comprobantes
export const createComprobante = async (token: any, formData: any) => {
  try {
    const response = await fetch(
      "https://cuenta-proveedores.up.railway.app/api/comprobantes/guardar",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Error al crear el comprobantes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al crear el comprobantes:", error);
  }
};

// Función para cambiar el estado del comprobante
export const ChangeComprobanteStatus = async (token: any, idComprobante: string) => {
  try {
    const response = await fetch(
      `https://cuenta-proveedores.up.railway.app/api/comprobantes/cambiar-estado/${idComprobante}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const updatedComprobante = await response.json();
      return updatedComprobante;
    } else {
      console.error("Error al cambiar el estado del comprobante");
      throw new Error("No se pudo cambiar el estado del comprobante.");
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    throw error;
  }
};

// Asignar movimiento al comprobante
export const AsignarMovimiento = async (token: any, selectedMovimiento: string, comprobanteId: string) => {
  try {
    const response = await fetch(
      "https://cuenta-proveedores.up.railway.app/api/comprobantes/asignar-comprobante",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idComprobante: comprobanteId,
          idMovimiento: selectedMovimiento,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error al asignar el movimiento: ${errorData.message || "Error desconocido"}`
      );
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    throw error;
  }
};
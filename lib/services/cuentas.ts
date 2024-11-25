
// Ver cuentas
export const getAccount = async (token: any) => {
  try {
    const response = await fetch(
      "https://cuenta-proveedores.up.railway.app/api/cuentas/ver-cuentas",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los proveedores");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
  }
};

// Crear Cuentas
export const createAccount = async (token: any, formData: any) => {
  try {
    const response = await fetch(
      "https://cuenta-proveedores.up.railway.app/api/cuentas/crear-cuenta",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error("Error al crear la cuenta");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al crear cuenta:", error);
  }
};

//cambiar estado cuenta
export const ChangeAccountStatus = async (token: any, idCuenta: string) => {
  try {
    console.log("ID enviado:", idCuenta);
    const response = await fetch(
      `https://cuenta-proveedores.up.railway.app/api/cuentas/cambiar-estado/${idCuenta}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Respuesta:", response);

    if (response.ok) {
      const updateCuenta = await response.json();
      return updateCuenta;
    } else {
      console.error("Error al cambiar el estado del comprobante");
      throw new Error("No se pudo cambiar el estado del comprobante.");
    }

  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    throw error;
  }
};
// Ver movimientos
export const fetchMovimientos = async (token: string) => {
    try {
        const response = await fetch(
            "https://cuenta-proveedores.up.railway.app/api/movimientos/ver",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error("Error al obtener los movimientos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener movimientos:", error);
        throw error;
    }
};
// Crear movimiento
export const crearMovimiento = async (token: string, formData: any) => {
    try {
        const response = await fetch(
            "https://cuenta-proveedores.up.railway.app/api/movimientos/crear-movimiento",
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
            throw new Error("Error al crear el movimiento");
        }
        return await response.json();
    } catch (error) {
        console.error("Error al crear el movimiento:", error);
        throw error;
    }
};

//cambiar estado movimiento
export const cambiarEstadoMovimiento  = async (token: any, idMovimiento: string) => {
    try {
      const response = await fetch(
        `https://cuenta-proveedores.up.railway.app/api/movimientos/cambiar-estado/${idMovimiento}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const updatemovimiento = await response.json();
        return updatemovimiento;
      } else {
        throw new Error("No se pudo cambiar el estado del movimiento.");
      }

    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      throw error;
    }
  };


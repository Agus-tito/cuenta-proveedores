
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
  
  
  
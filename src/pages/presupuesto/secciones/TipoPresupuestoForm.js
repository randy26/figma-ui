import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import "../../../assets/styles/presupuesto/tipoPresupuesto.css";
import { obtenerUnidadesNegocio, UnidadNegocio } from "../../../service/unidadNegocioService";
export default function TipoPresupuestoForm() {
    const { register } = useFormContext();
    const [unidades, setUnidades] = useState([]);
    useEffect(() => {
        const cargarUnidades = async () => {
            try {
                const data = await obtenerUnidadesNegocio();
                setUnidades(data);
            }
            catch (error) {
                console.error("Error cargando unidades de negocio:", error);
            }
        };
        cargarUnidades();
    }, []);
    return (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-column form-column-small", children: [_jsx("label", { className: "form-label", children: "Unidad de negocios" }), _jsxs("select", { ...register("unidadNegocio"), className: "select-underline", children: [_jsx("option", { value: "", children: "Seleccione..." }), unidades.map((u) => (_jsx("option", { value: u.nombre, children: u.nombre }, u.idUnidadNegocio)))] })] }), _jsx("div", { className: "form-column checkbox-wrapper", children: _jsxs("div", { className: "checkbox-inner", children: [_jsx("input", { ...register("bpl"), type: "checkbox", id: "bpl", className: "checkbox-underline" }), _jsx("label", { htmlFor: "bpl", className: "form-label ml-2", children: "BPL" })] }) })] }) }));
}

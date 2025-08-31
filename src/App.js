import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AppRouter, {}) }));
}
export default App;

import BaseComponent from "./BaseComponent.jsx";
import { Outlet } from "react-router-dom";

export default class Layout extends BaseComponent {
  render() {
    return (
      <>
        <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
}

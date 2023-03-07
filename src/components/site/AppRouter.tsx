import { Route, Routes } from "react-router-dom";

import { Main, MultiFusionPage } from "~/components";

export const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/multi" element={<MultiFusionPage />} />
    <Route path="/:id?" element={<Main />} />
  </Routes>
);

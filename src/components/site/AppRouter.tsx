import { Route, Routes } from "react-router-dom";

import { FavoritesPage, Main, MultiFusionPage } from "~/components";

export const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/multi" element={<MultiFusionPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="/:id?" element={<Main />} />
  </Routes>
);

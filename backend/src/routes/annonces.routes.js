import { Router as ExpressRouter } from 'express';

import { annonceCtrl } from '#app/controllers/index.js';
import { protect } from '#app/middlewares/index.js';

const annoncesRouter = ExpressRouter();

annoncesRouter.route('/').get(annonceCtrl.getAllAnnonces).post(protect, annonceCtrl.createAnnonce);

annoncesRouter
  .route('/:id')
  .get(annonceCtrl.getAnnonce)
  .put(protect, annonceCtrl.updateAnnonce)
  .delete(protect, annonceCtrl.deleteAnnonce);

export { annoncesRouter };

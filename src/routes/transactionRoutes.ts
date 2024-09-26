import { Router } from "express";
import { TransactionController } from "../controllers/transactionController";
import "../middleware/passport";
import formData from "../middleware/formData";
import passport from "passport";

const router = Router();
const transactionController = new TransactionController();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  formData,
  transactionController.createTransaction.bind(transactionController)
);

router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    formData,
    transactionController.updateTransaction.bind(transactionController)
  );

router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  transactionController.getTransactions.bind(transactionController)
);

export default router;

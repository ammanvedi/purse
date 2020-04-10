import { AccountHolder, BankAccount } from "../../../types/database";

export const addOrUpdateBankAccount = (account: BankAccount): string => `
    INSERT INTO bankAccount (id, balanceCurrent, balanceAvailable, accountName, accountType, isoCurrency, accountHolderId)
    VALUES (
            "${account.id}",
            ${account.balanceCurrent},
            ${account.balanceAvailable},
            "${account.accountName}",
            "${account.accountType}",
            "${account.isoCurrency}",
            ${account.accountHolderId}
            )
    ON CONFLICT(id) DO UPDATE SET
        balanceCurrent=excluded.balanceCurrent,
        balanceAvailable=excluded.balanceAvailable
`;

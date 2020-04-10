import {AccountHolder} from "../../../types/database";

export const createNewAccountHolderQuery = (holder: AccountHolder): string => `
    INSERT INTO accountHolder (username, passwordHash, firstName, lastName, accessToken)
    VALUES (
            "${holder.username}",
            "${holder.passwordHash}",
            "${holder.firstName}",
            "${holder.lastName}",
            "${holder.accessToken}"
            )
`
import {Category} from "../../../types/database";

export const addOrUpdateCategory = (category: Category): string => `
    INSERT INTO categories (id, description)
    VALUES (
            "${category.id}",
            "${category.description}",
            )
    ON CONFLICT(id) DO UPDATE SET
        description=excluded.description
`;

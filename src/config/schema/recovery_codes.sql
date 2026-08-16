CREATE TABLE `recovery_codes` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, -- Aqui é o ID do código 
    `user_id` INT UNSIGNED NOT NULL, -- Aqui é o ID do user que USOU o código
    `code_hash` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci', -- codigo hasheado
    `expires_at` DATETIME NOT NULL, -- Quando expira
    `used` BOOLEAN NOT NULL DEFAULT FALSE,-- identifica se o código já foi usado
    `used_at` DATETIME NULL, -- Quando foi usado
    `created_at` TIMESTAMP NOT NULL DEFAULT (now()), -- Quando foi criado

    PRIMARY KEY (`id`) USING BTREE,
    INDEX `idx_user_id` (`user_id`) USING BTREE,
    INDEX `idx_code_hash` (`code_hash`) USING BTREE,
    FOREIGN KEY (`user_id`) REFERENCES `clientes`(`id`) ON DELETE CASCADE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;
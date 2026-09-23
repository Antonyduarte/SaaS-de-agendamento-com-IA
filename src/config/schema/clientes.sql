CREATE TABLE
	`clientes` (
		`id` int unsigned NOT NULL AUTO_INCREMENT,
		`nome` varchar(255) CHARACTER
		SET
			utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
			`email` varchar(255) CHARACTER
		SET
			utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
			`role` enum ('user', 'admin') CHARACTER
		SET
			utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'user',
			`password` varchar(550) NOT NULL,
			`created_at` timestamp NOT NULL DEFAULT (now ()),
			`modified_at` timestamp NOT NULL DEFAULT (now ()) ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (`id`) USING BTREE,
			UNIQUE KEY `email` (`email`) USING BTREE
	) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci
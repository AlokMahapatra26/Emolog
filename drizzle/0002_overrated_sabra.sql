CREATE TABLE "chat_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"question" text NOT NULL,
	"response" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);

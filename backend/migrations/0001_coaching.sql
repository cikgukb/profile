CREATE TABLE IF NOT EXISTS coaching_requests (
  id TEXT PRIMARY KEY,
  payload_hash TEXT NOT NULL,
  payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_confirmation',
  created_at INTEGER NOT NULL,
  notification_status TEXT NOT NULL DEFAULT 'pending',
  notification_payload TEXT NOT NULL,
  notification_attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at INTEGER NOT NULL,
  lease_until INTEGER NOT NULL DEFAULT 0,
  message_id TEXT,
  notification_error TEXT
);
CREATE INDEX IF NOT EXISTS coaching_outbox ON coaching_requests(notification_status, next_attempt_at);
CREATE TABLE IF NOT EXISTS coaching_rate_limits (
  bucket TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

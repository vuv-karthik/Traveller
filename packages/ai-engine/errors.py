class AIOutputValidationError(Exception):
    """Raised when the AI output cannot be parsed or validated against the schema."""
    def __init__(self, message: str, original_output: str = None):
        super().__init__(message)
        self.original_output = original_output

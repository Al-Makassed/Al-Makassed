namespace Makassed.Contracts.Enums;

public enum FileReadingState
{
    NotStarted, // didn't start reading the file yet
    InProgress, // started reading the file, but didn't reach the end yet regardless of the time spent
    FinishedUnsuccessfully, // went to the end of the file but didn't spent enough time
    Finished // went to the end of the file and spent enough time
}

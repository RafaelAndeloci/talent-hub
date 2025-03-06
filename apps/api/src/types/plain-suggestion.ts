import { SuggestionStatus } from "@talent-hub/shared"
import { Moment } from "moment";

export type PlainSuggestion = {
    status: SuggestionStatus;
    suggestedBy: string;
    suggestedAt: Moment;
    validatedBy: string | null;
    validatedAt: Moment | null;
}
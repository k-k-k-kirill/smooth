export interface SubmissionValues {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string | undefined,
    confirm_password?: string
}

export interface SubmissionErrors extends SubmissionValues {}
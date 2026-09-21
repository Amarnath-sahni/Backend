class ApiResponse {
    constructor(statusCode, message, data = null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    send(res) {
        const obj = {
            success: true,
            message: this.message,
        };

        if (this.data) {
            obj.data = this.data;
        }

        return res.status(this.statusCode).json(obj);
    }
}

export default ApiResponse;

package com.fooddel.web.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse {
    private boolean success;
    private String message;
    private Object data;
    private String token;
    private Object cartData;
    private String session_url;

    public static ApiResponse ok(String message) {
        ApiResponse r = new ApiResponse();
        r.success = true;
        r.message = message;
        return r;
    }

    public static ApiResponse ok(String message, Object data) {
        ApiResponse r = new ApiResponse();
        r.success = true;
        r.message = message;
        r.data = data;
        return r;
    }

    public static ApiResponse fail(String message) {
        ApiResponse r = new ApiResponse();
        r.success = false;
        r.message = message;
        return r;
    }
}

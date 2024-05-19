package pt.ipp.isep.dei.desofsnews.controller;
import java.io.IOException;

import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class ContentTypeCheckingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String contentType = httpServletRequest.getContentType();
        if (contentType != null && !contentType.contains("application/json")) {
            throw new ServletException("Invalid Content-Type. Expected application/json but got " + contentType);
        }
        chain.doFilter(request, response);
    }
}
package pt.ipp.isep.dei.DesofsNews.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import pt.ipp.isep.dei.desofsnews.app.DesofsNewsApplication;
import pt.ipp.isep.dei.desofsnews.controller.ContentTypeCheckingFilter;

@SpringBootTest
@ContextConfiguration(classes = {DesofsNewsApplication.class})
public class ContentTypeCheckingFilterTest {

    @InjectMocks
    private ContentTypeCheckingFilter filter;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain chain;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testDoFilter_InvalidContentType() throws IOException, ServletException {
        when(request.getContentType()).thenReturn("text/html");

        ServletException exception = assertThrows(ServletException.class, () -> {
            filter.doFilter(request, response, chain);
        });

        assertEquals("Invalid Content-Type. Expected application/json but got text/html", exception.getMessage());
    }

    @Test
    public void testDoFilter_ValidContentType() throws IOException, ServletException {
        when(request.getContentType()).thenReturn("application/json");

        filter.doFilter(request, response, chain);

        verify(chain, times(1)).doFilter(request, response);
    }

    @Test
    public void testDoFilter_NullContentType() throws IOException, ServletException {
        when(request.getContentType()).thenReturn(null);

        filter.doFilter(request, response, chain);

        verify(chain, times(1)).doFilter(request, response);
    }
}
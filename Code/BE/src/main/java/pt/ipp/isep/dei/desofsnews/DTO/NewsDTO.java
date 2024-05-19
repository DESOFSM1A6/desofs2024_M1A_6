package pt.ipp.isep.dei.desofsnews.DTO;

import java.util.Calendar;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NewsDTO {
    private String title;
    private String content;
    private Calendar dateTime;
    private String writer;
}

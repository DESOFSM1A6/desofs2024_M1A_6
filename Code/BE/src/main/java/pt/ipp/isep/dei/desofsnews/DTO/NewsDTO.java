package pt.ipp.isep.dei.desofsnews.DTO;

import java.util.Calendar;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewsDTO {
    private String text;
    private Calendar dateTime;
    private int likes;
}

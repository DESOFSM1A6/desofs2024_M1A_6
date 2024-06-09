package pt.ipp.isep.dei.desofsnews.DTO;

import java.util.Calendar;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import pt.ipp.isep.dei.desofsnews.model.Status;

@Getter
@AllArgsConstructor
public class NewsDTO {
    private Long id;
    private String title;
    private String content;
    private Calendar creationDate;
    private String writer;
    private Status status;
    private List<String> imageUrl;

}

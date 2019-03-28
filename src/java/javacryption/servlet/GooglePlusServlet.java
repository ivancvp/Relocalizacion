
import java.io.IOException;
import javax.servlet.AsyncContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import static org.jfree.util.Log.debug;

@WebServlet("/googleplus") 
public class GooglePlusServlet extends HttpServlet {
   private static final String CLIENT_ID = "client id here"; 
   private static final String CLIENT_SECRET = "client secret here";
   
   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse res) 
      throws IOException, ServletException {
      //Configure 
   }
} 

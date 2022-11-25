import { HistoryContainer, HistoryList, Status } from "./styles";
export function History() {
  return (
    <HistoryContainer>
      <h1>My History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Time</th>
              <th>Started at</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task</td>
              <td>25 min</td>
              <td>Leitura do livro X</td>
              <td>
                <Status status="warning" />
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>25 min</td>
              <td>Leitura do livro X</td>
              <td>
                <Status status="warning" />
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>25 min</td>
              <td>Leitura do livro X</td>
              <td>
                <Status status="warning" />
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>25 min</td>
              <td>Leitura do livro X</td>
              <td>
                <Status status="warning" />
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>25 min</td>
              <td>Leitura do livro X</td>
              <td>
                <Status status="warning" />
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}

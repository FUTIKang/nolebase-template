#BFS #DFS #搜索 
[[DFS 和 BFS]]
### [DFS]
*栈实现*
```c++递归实现
#include <iostream>
#include <vector>
using namespace std;

int visited[101], sum, n, e[101][101];
vector<char> vec;

void dfs(int cur)
{
    int i;
    cout << vec[cur - 1] << " ";
    sum++; // 没访问一个节点sum就++
    if (sum == n)
        return; // 所有的顶点已经访问过直接退出
    for (int i = 1; i <= n; i++)
    {
        // 判断当前顶点cur到顶点i是否有边,并判断顶点i是否已经访问过
        if (e[cur][i] == 1 && visited[i] == 0)
        {
            visited[i] = 1;
            dfs(i);
        }
    }
    return;
}

int main()
{
    int i, j, CN, m;
    int a, b;
    char c;
    cout << "请输入图的结点数：" << endl;
    cin >> n;
    CN = n;
    cout << "请输入图的全部结点（字符型式）" << endl;
    while (CN--)
    {
        cin >> c;
        vec.push_back(c);
    }
    cin.clear();
    cout << "请输入图的边的条数" << endl;
    cin >> m;
    // 初始化邻接矩阵
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= n; j++)
        {
            e[i][j] = 0;
        }
    }
    cout << "边：" << endl;
    // 两点之间的连接
    for (i = 1; i <= m; i++)
    {
        cin >> a >> b;
        e[a][b] = e[b][a] = 1; // 无向图
    }
    // 从顶点1出发
    visited[1] = 1; // 标记一号顶点已经被访问
    dfs(1);         // 从1号顶点开始遍历
    cout << endl;
    system("pause");
    return 0;

}
```
### [BFS]


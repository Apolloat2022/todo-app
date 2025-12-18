// src/utils/storageUtils.js
export function backupTodos(todos) {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    return dataUri;
}

export function restoreFromBackup(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const todos = JSON.parse(event.target.result);
                resolve(todos);
            } catch (error) {
                reject("Invalid backup file format");
            }
        };
        reader.onerror = () => reject("Error reading file");
        reader.readAsText(file);
    });
}

export function getTodoStats(todos) {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const priorityCounts = {
        high: todos.filter(t => t.priority === "high").length,
        medium: todos.filter(t => t.priority === "medium").length,
        low: todos.filter(t => t.priority === "low").length
    };
    
    return {
        total,
        completed,
        pending,
        completionRate,
        priorityCounts
    };
}

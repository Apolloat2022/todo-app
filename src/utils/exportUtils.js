// src/utils/exportUtils.js
export function exportToCSV(todos, filename = "todos.csv") {
    if (!todos || todos.length === 0) {
        alert("No todos to export!");
        return;
    }
    
    const headers = ["ID", "Task", "Completed", "Priority", "Category", "Created At"];
    
    const csvContent = [
        headers.join(","),
        ...todos.map(todo => [
            todo.id,
            `"${todo.text.replace(/"/g, '""')}"`,
            todo.completed ? "Yes" : "No",
            todo.priority || "medium",
            todo.category || "general",
            todo.createdAt || new Date().toISOString()
        ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

export function exportToJSON(todos, filename = "todos.json") {
    if (!todos || todos.length === 0) {
        alert("No todos to export!");
        return;
    }
    
    const dataStr = JSON.stringify(todos, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

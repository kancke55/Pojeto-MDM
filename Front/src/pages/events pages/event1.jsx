import React from "react";

const posts = [
    {
        id: 1,
        title: "Lançamento do MDM",
        date: "31 de maio de 2026",
        summary:
            "Um resumo rápido sobre o novo módulo de eventos e atualizações do projeto MDM.",
    },
    {
        id: 2,
        title: "Como usar a nova página de eventos",
        date: "29 de maio de 2026",
        summary:
            "Passo a passo para navegar e aproveitar as novas funcionalidades da página.",
    },
    {
        id: 3,
        title: "Dicas para conteúdo rápido",
        date: "27 de maio de 2026",
        summary:
            "Sugestões de melhores práticas para criar posts e manter o blog organizado.",
    },
];

const Event1 = () => {
    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>MBlog</h1>
                    <p style={styles.subtitle}>
                        Notícias, atualizações e dicas do projeto MDM.
                    </p>
                </div>
            </header>

            <main style={styles.main}>
                <section style={styles.posts}>
                    {posts.map((post) => (
                        <article key={post.id} style={styles.postCard}>
                            <h2 style={styles.postTitle}>{post.title}</h2>
                            <p style={styles.postDate}>{post.date}</p>
                            <p style={styles.postSummary}>{post.summary}</p>
                            <button style={styles.readButton}>Ler mais</button>
                        </article>
                    ))}
                </section>

                <aside style={styles.sidebar}>
                    <div style={styles.widget}>
                        <h3 style={styles.widgetTitle}>Sobre</h3>
                        <p style={styles.widgetText}>
                            Página estilo MBlog para registrar novidades, eventos e informações
                            importantes do projeto.
                        </p>
                    </div>
                    <div style={styles.widget}>
                        <h3 style={styles.widgetTitle}>Categorias</h3>
                        <ul style={styles.categoryList}>
                            <li>Eventos</li>
                            <li>Atualizações</li>
                            <li>Guias</li>
                        </ul>
                    </div>
                </aside>
            </main>
        </div>
    );
};

const styles = {
    page: {
        fontFamily: "Inter, sans-serif",
        color: "#222",
        background: "#f7f8fb",
        minHeight: "100vh",
        padding: "24px",
    },
    header: {
        maxWidth: "960px",
        margin: "0 auto 32px",
        padding: "32px 24px",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    },
    title: {
        margin: 0,
        fontSize: "2.4rem",
    },
    subtitle: {
        margin: "12px 0 0",
        color: "#555",
        lineHeight: 1.6,
    },
    main: {
        display: "grid",
        gridTemplateColumns: "2.3fr 1fr",
        gap: "24px",
        maxWidth: "960px",
        margin: "0 auto",
    },
    posts: {
        display: "grid",
        gap: "20px",
    },
    postCard: {
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.04)",
    },
    postTitle: {
        margin: "0 0 10px",
        fontSize: "1.5rem",
    },
    postDate: {
        margin: "0 0 16px",
        color: "#888",
        fontSize: "0.95rem",
    },
    postSummary: {
        margin: "0 0 20px",
        lineHeight: 1.75,
    },
    readButton: {
        padding: "10px 18px",
        border: "none",
        borderRadius: "999px",
        background: "#2563eb",
        color: "#fff",
        cursor: "pointer",
    },
    sidebar: {
        display: "grid",
        gap: "20px",
    },
    widget: {
        background: "#fff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.04)",
    },
    widgetTitle: {
        margin: "0 0 12px",
        fontSize: "1.1rem",
    },
    widgetText: {
        margin: 0,
        lineHeight: 1.7,
        color: "#555",
    },
    categoryList: {
        margin: 0,
        padding: 0,
        listStyle: "none",
        lineHeight: 1.8,
        color: "#555",
    },
};

export default Event1;
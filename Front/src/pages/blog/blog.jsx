import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/header/header'
import './blog.css'
import Footer from '../../components/footer/footer'
import { BiFootball } from 'react-icons/bi'
import { Context } from '../../contextt/MyContext'
import { getComments, postComment } from '../../service/api'

export default function Blog() {
  const { token } = useContext(Context);
  const { id } = useParams();
  const eventoId = id || '1';
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        const commentList = await getComments(eventoId);
        setComments(commentList);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error.message || error);
      }
    };

    loadComments();
  }, [eventoId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!token) {
      return window.alert('Faça login para enviar um comentário.');
    }
    if (!newComment.trim()) {
      return window.alert('Digite um comentário antes de enviar.');
    }

    try {
      await postComment(eventoId, newComment.trim(), token);
      setNewComment('');
      const commentList = await getComments(eventoId);
      setComments(commentList);
    } catch (error) {
      window.alert(error.message || 'Erro ao enviar comentário.');
    }
  };

  return (
    <div className='event-page'>
      <Header />

      <section className='event-hero'>
        <div className='event-hero-content'>
          <span className='event-label'>Postagem de Evento</span>
          <h1>Festival Esportivo Meninos do Morro</h1>
          <p>Uma tarde de futebol, música e acolhimento para toda a comunidade. Venha viver uma experiência cheia de jogo bonito, atividades sociais e muita energia no campo.</p>
          <div className='event-hero-meta'>
            <div>
              <strong>Data</strong>
              <span>12 de Julho de 2026</span>
            </div>
            <div>
              <strong>Local</strong>
              <span>Campo da Rua Nova, Santa Rita do Sapucaí</span>
            </div>
          </div>
        </div>
      </section>

      <main className='event-main'>
        <article className='event-details'>
          <h2>Sobre o evento</h2>
          <p className='event-description'>
            O Festival Esportivo Meninos do Morro reúne jovens, famílias e amigos para uma celebração do esporte e da vida comunitária.
            Além dos jogos, teremos oficinas, apresentações culturais, praça de alimentação e atividades de inclusão social.
          </p>

          <div className='event-highlight'>
            <h3>O que esperar</h3>
            <ul>
              <li>Jogos amistosos com participações especiais</li>
              <li>Gincanas e torneios de futsal</li>
              <li>Oficinas de liderança e saúde</li>
              <li>Espaço kids e bazar solidário</li>
            </ul>
          </div>

          <section className='event-gallery'>
            <h3>Galeria de imagens</h3>
            <div className='event-gallery-grid'>
              <img src='/img/Meninosdomorro.jpeg' alt='Equipe do Meninos do Morro' />
              <img src='/img/eventofut.jpg' alt='Jogo de futebol no evento' />
              <img src='/img/omorro.jpeg' alt='Meninos em campo no evento' />
            </div>
          </section>

          <section className='comment-section'>
            <h3>Comentários do evento</h3>
            {comments.length === 0 ? (
              <p className='comment-empty'>Seja o primeiro a comentar neste evento.</p>
            ) : (
              <div className='comment-list'>
                {comments.map((comment) => (
                  <div key={comment.id} className='comment-card'>
                    <div className='comment-header'>
                      <span className='comment-author'>{comment.nome}</span>
                      <span className='comment-date'>{new Date(comment.created_at).toLocaleString('pt-BR')}</span>
                    </div>
                    <p className='comment-text'>{comment.texto}</p>
                  </div>
                ))}
              </div>
            )}

            <form className='comment-form' onSubmit={handleSubmitComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={token ? 'Escreva seu comentário...' : 'Faça login para comentar.'}
                disabled={!token}
              />
              <button type='submit'>Enviar comentário</button>
            </form>
          </section>
        </article>

        <aside className='event-register'>
          <div className='event-card'>
            <h3>Detalhes do evento</h3>
            <div className='event-meta'>
              <div>
                <strong>Horário</strong>
                <span>14h às 19h</span>
              </div>
              <div>
                <strong>Entrada</strong>
                <span>Gratuita</span>
              </div>
            </div>
            <p>Traga sua família e convide os amigos. Toda a comunidade é bem-vinda!</p>
            <a className='btn-primary' href='https://example.com/inscricao' target='_blank' rel='noopener noreferrer'>Inscreva-se</a>
          </div>

          <div className='event-card event-info-box'>
            <h3>Organização</h3>
            <p>Projeto Meninos do Morro</p>
            <p>Contato: contato@meninosdomorro.org</p>
            <p><BiFootball className='icon-football' /> Conectando o esporte ao futuro da comunidade.</p>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { Context } from '../../contextt/MyContext'
import { getComments, postComment } from '../../service/api'
import './blog.css'

const galleryImages = [
  { src: '/img/md1 (1).jpeg', alt: 'Momento do Natal Solidário 2025' },
  { src: '/img/md1 (2).jpeg', alt: 'Crianças participando das atividades' },
  { src: '/img/md1 (3).jpeg', alt: 'Entrega de presentes para as crianças' },
  { src: '/img/md1 (4).jpeg', alt: 'Brinquedos entregues no evento' },
  { src: '/img/md1 (5).jpeg', alt: 'Brincadeiras com as crianças' },
  { src: '/img/md1 (6).jpeg', alt: 'Famílias reunidas no Natal Solidário' },
  { src: '/img/md1 (7).jpeg', alt: 'Voluntários apoiando o evento' },
  { src: '/img/md1 (8).jpeg', alt: 'Crianças brincando no evento' },
  { src: '/img/md1 (9).jpeg', alt: 'Entrega de brinquedos' },
  { src: '/img/md1 (10).jpeg', alt: 'Momentos de alegria no Natal Solidário' },
  { src: '/img/md1 (11).jpeg', alt: 'Participação da comunidade' },
  { src: '/img/md1 (12).jpeg', alt: 'Encerramento do evento' },
];

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
    <div className='event-page natal-page'>
      <Header />

      <section className='event-hero natal-hero'>
        <div className='event-hero-content'>
          <span className='event-label natal-label'>Natal Solidário 2025</span>
          <h1>Um Natal de alegria, presentes e brincadeiras para as crianças</h1>
          <p>
            O Natal Solidário 2025 reuniu voluntários, famílias e apoiadores para levar presentes, brinquedos,
            brincadeiras e muito carinho para as crianças da comunidade.
          </p>
          <div className='event-hero-meta'>
            <div>
              <strong>Data</strong>
              <span>Dezembro de 2025</span>
            </div>
            <div>
              <strong>Local</strong>
              <span>Comunidade atendida pelo Projeto Meninos do Morro</span>
            </div>
            <div>
              <strong>Ação</strong>
              <span>Entrega de presentes, brinquedos e atividades recreativas</span>
            </div>
          </div>
        </div>
      </section>

      <main className='event-main'>
        <article className='event-details'>
          <h2>O que aconteceu no evento</h2>
          <p className='event-description'>
            Durante o Natal Solidário 2025, o Projeto Meninos do Morro realizou uma ação especial para celebrar o
            espírito de união e solidariedade. Crianças e famílias foram recebidas com muita alegria, música,
            brincadeiras e momentos de convivência.
          </p>
          <p className='event-description'>
            A entrega de presentes e brinquedos marcou o ponto alto do encontro. Cada detalhe foi preparado para que as
            crianças vivessem um Natal mais feliz, colorido e cheio de memórias boas.
          </p>

          <div className='event-highlight natal-highlight'>
            <h3>Momentos marcantes</h3>
            <ul>
              <li>Entrega de presentes para as crianças participantes.</li>
              <li>Distribuição de brinquedos para diferentes idades.</li>
              <li>Brincadeiras, música e atividades recreativas.</li>
              <li>Participação de famílias, voluntários e apoiadores.</li>
              <li>Um ambiente de acolhimento, gratidão e união comunitária.</li>
            </ul>
          </div>

          <section className='event-gallery'>
            <h3>Galeria do Natal Solidário</h3>
            <div className='event-gallery-grid'>
              {galleryImages.map((image) => (
                <img key={image.src} src={image.src} alt={image.alt} />
              ))}
            </div>
          </section>

          <section className='comment-section'>
            <h3>Comentários do evento</h3>
            {comments.length === 0 ? (
              <p className='comment-empty'>Seja o primeiro a comentar sobre o Natal Solidário 2025.</p>
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
                placeholder={token ? 'Escreva seu comentário sobre o evento...' : 'Faça login para comentar.'}
                disabled={!token}
              />
              <button type='submit'>Enviar comentário</button>
            </form>
          </section>
        </article>

        <aside className='event-register'>
          <div className='event-card event-info-box natal-info-box'>
            <h3>Impacto do evento</h3>
            <p>
              Mais do que entregar presentes, o Natal Solidário 2025 criou um espaço de convivência, brincadeiras e
              acolhimento para crianças e famílias.
            </p>
            <p>
              Cada doação e cada voluntário ajudaram a transformar o dia das crianças em uma experiência inesquecível.
            </p>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  )
}

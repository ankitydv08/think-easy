
import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Compass,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  Plus,
  Menu,
  X,
  ChevronLeft,
  Zap,
} from 'lucide-react'
import './App.css'

type Personality = {
  id: number
  name: string
  role: string
  category: string
  description: string
  image: string
  color: string
}

const personalities: Personality[] = [
  {
    id: 1,
    name: 'Bill Gates',
    role: 'Technology & Business',
    category: 'Technology',
    description: 'Think about technology, innovation and solving problems at scale.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500',
    color: 'blue',
  },
  {
    id: 2,
    name: 'Steve Jobs',
    role: 'Design & Innovation',
    category: 'Business',
    description: 'Explore product thinking, creativity and building remarkable things.',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500',
    color: 'orange',
  },
  {
    id: 3,
    name: 'Albert Einstein',
    role: 'Science & Philosophy',
    category: 'Science',
    description: 'Question everything and explore the universe through curiosity.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500',
    color: 'purple',
  },
  {
    id: 4,
    name: 'Warren Buffett',
    role: 'Investing & Finance',
    category: 'Business',
    description: 'Explore long-term thinking, value investing and decision-making.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500',
    color: 'green',
  },
  {
    id: 5,
    name: 'Elon Musk',
    role: 'Engineering & Future',
    category: 'Technology',
    description: 'Think about ambitious engineering and first-principles thinking.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500',
    color: 'blue',
  },
  {
    id: 6,
    name: 'Marcus Aurelius',
    role: 'Stoicism & Life',
    category: 'Philosophy',
    description: 'Explore discipline, resilience and the art of living well.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    color: 'purple',
  },
]

const categories = ['All', 'Technology', 'Business', 'Science', 'Philosophy']

function App() {
  const [page, setPage] = useState<'home' | 'explore' | 'chat'>('home')
  const [selected, setSelected] = useState<Personality>(personalities[0])
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<
    { role: 'user' | 'ai'; content: string }[]
  >([
    {
      role: 'ai',
      content:
        "Hello! I'm an AI simulation inspired by publicly documented ideas and perspectives associated with Bill Gates. What would you like to think through today?",
    },
  ])
  const [mobileMenu, setMobileMenu] = useState(false)

  const filtered = personalities.filter((person) => {
    const matchesCategory =
      category === 'All' || person.category === category
    const matchesSearch =
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.role.toLowerCase().includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  function openChat(person: Personality) {
    setSelected(person)
    setMessages([
      {
        role: 'ai',
        content: `Hello! I'm an AI simulation inspired by publicly documented ideas and perspectives associated with ${person.name}. What would you like to explore today?`,
      },
    ])
    setPage('chat')
    setMobileMenu(false)
  }

  function sendMessage() {
    if (!message.trim()) return

    const userMessage = message.trim()

    setMessages((previous) => [
      ...previous,
      { role: 'user', content: userMessage },
      {
        role: 'ai',
        content: `That's an interesting question. Let's examine it from a ${selected.role.toLowerCase()} perspective. The first thing I'd suggest is to understand the underlying problem, question your assumptions, and focus on what creates real value. What part would you like to explore further?`,
      },
    ])

    setMessage('')
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon"><Brain size={21} /></div>
          <span>think<span className="brand-accent">loud</span></span>
          <button className="mobile-close" onClick={() => setMobileMenu(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <button
          className={`nav-link ${page === 'home' ? 'active' : ''}`}
          onClick={() => { setPage('home'); setMobileMenu(false) }}
        >
          <Compass size={18} /> Home
        </button>

        <button
          className={`nav-link ${page === 'explore' ? 'active' : ''}`}
          onClick={() => { setPage('explore'); setMobileMenu(false) }}
        >
          <Sparkles size={18} /> Explore personalities
        </button>

        <div className="sidebar-divider" />
        <div className="sidebar-label">YOUR SPACE</div>

        <button className="nav-link" onClick={() => setPage('chat')}>
          <MessageCircle size={18} /> Recent conversations
        </button>

        <div className="sidebar-bottom">
          <div className="sidebar-promo">
            <div className="promo-icon"><Zap size={18} /></div>
            <strong>Think beyond yourself.</strong>
            <p>Different perspectives. Better questions. Bigger ideas.</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">G</div>
            <div>
              <strong>Guest User</strong>
              <span>Exploring Think Loud</span>
            </div>
          </div>
        </div>
      </aside>

      {mobileMenu && (
        <div className="mobile-overlay" onClick={() => setMobileMenu(false)} />
      )}

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileMenu(true)}>
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            Think Loud <span>/</span> {page === 'home' ? 'Home' : page === 'explore' ? 'Explore' : 'Conversation'}
          </div>

          <div className="topbar-right">
            <span className="status-dot" /> Early access
            <button className="login-button">Sign in <ArrowUpRight size={15} /></button>
          </div>
        </header>

        {page === 'home' && (
          <section className="page-content">
            <div className="hero">
              <div className="hero-glow" />
              <div className="eyebrow"><Sparkles size={14} /> A DIFFERENT WAY TO THINK</div>
              <h1>
                What if you could<br />
                <span>think like anyone?</span>
              </h1>
              <p className="hero-description">
                Step into different perspectives. Have conversations with
                AI simulations inspired by the world's most interesting minds.
              </p>

              <div className="hero-actions">
                <button className="primary-button" onClick={() => setPage('explore')}>
                  Explore personalities <ArrowRight size={17} />
                </button>
                <span className="hero-note">Your next big idea starts here.</span>
              </div>

              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="hero-symbol"><Brain size={82} strokeWidth={0.8} /></div>
            </div>

            <div className="section-heading">
              <div>
                <div className="section-kicker">START THINKING</div>
                <h2>Meet different minds.</h2>
                <p>Choose a perspective. Start a conversation.</p>
              </div>
              <button className="text-button" onClick={() => setPage('explore')}>
                View all <ArrowRight size={16} />
              </button>
            </div>

            <div className="personality-grid">
              {personalities.slice(0, 4).map((person) => (
                <PersonalityCard
                  key={person.id}
                  person={person}
                  onClick={() => openChat(person)}
                />
              ))}
            </div>

            <div className="bottom-banner">
              <div className="banner-icon"><Brain size={25} /></div>
              <div>
                <h3>One question. Multiple perspectives.</h3>
                <p>The smartest conversations begin with a different point of view.</p>
              </div>
              <button onClick={() => setPage('explore')}>
                Discover minds <ArrowRight size={16} />
              </button>
            </div>
          </section>
        )}

        {page === 'explore' && (
          <section className="page-content">
            <div className="explore-heading">
              <div className="section-kicker">THE THINKING ROOM</div>
              <h1>Explore minds<span>.</span></h1>
              <p>Discover different ways of thinking, learning and seeing the world.</p>
            </div>

            <div className="search-box">
              <Search size={19} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search personalities..."
              />
            </div>

            <div className="category-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`category-chip ${category === item ? 'selected' : ''}`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="explore-results">
              <div className="results-count">{filtered.length} MINDS TO EXPLORE</div>
              <div className="personality-grid">
                {filtered.map((person) => (
                  <PersonalityCard
                    key={person.id}
                    person={person}
                    onClick={() => openChat(person)}
                  />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="empty-state">No personalities found. Try another search.</div>
              )}
            </div>
          </section>
        )}

        {page === 'chat' && (
          <section className="chat-page">
            <div className="chat-header">
              <button className="back-button" onClick={() => setPage('explore')}>
                <ChevronLeft size={18} /> Explore
              </button>
              <div className="chat-person">
                <img src={selected.image} alt={selected.name} />
                <div>
                  <strong>{selected.name}</strong>
                  <span>AI personality simulation · {selected.role}</span>
                </div>
              </div>
              <button className="new-chat-button" onClick={() => openChat(selected)}>
                <Plus size={17} /> New chat
              </button>
            </div>

            <div className="chat-disclaimer">
              <Sparkles size={14} />
              You're talking to an AI simulation, not the actual person.
            </div>

            <div className="chat-messages">
              <div className="chat-intro">
                <div className="chat-large-avatar">
                  <img src={selected.image} alt="" />
                </div>
                <h2>Think with {selected.name.split(' ')[0]}.</h2>
                <p>Explore ideas, challenge assumptions and ask better questions.</p>
              </div>

              {messages.map((item, index) => (
                <div className={`message-row ${item.role}`} key={index}>
                  {item.role === 'ai' && (
                    <div className="message-avatar"><Brain size={17} /></div>
                  )}
                  <div className="message-bubble">{item.content}</div>
                </div>
              ))}
            </div>

            <div className="chat-composer">
              <div className="composer-inner">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={`Ask ${selected.name.split(' ')[0]} something...`}
                />
                <button onClick={sendMessage} disabled={!message.trim()}>
                  <Send size={18} />
                </button>
              </div>
              <p>AI-generated responses for exploration. Verify important information independently.</p>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function PersonalityCard({
  person,
  onClick,
}: {
  person: Personality
  onClick: () => void
}) {
  return (
    <button className="personality-card" onClick={onClick}>
      <div className={`card-image ${person.color}`}>
        <img src={person.image} alt={person.name} />
        <span className="card-arrow"><ArrowUpRight size={19} /></span>
      </div>
      <div className="card-info">
        <span className="card-category">{person.category}</span>
        <h3>{person.name}</h3>
        <span className="card-role">{person.role}</span>
        <p>{person.description}</p>
        <div className="card-footer">
          <span>Start thinking</span>
          <ArrowRight size={15} />
        </div>
      </div>
    </button>
  )
}

export default App

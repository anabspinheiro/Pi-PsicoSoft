import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

const API_URL = import.meta.env.VITE_API_URL;
const APP_NAME = import.meta.env.VITE_APP_NAME || "PsicoSoft MGF";

function Home() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setMe(data))
      .catch(() => {});
  }, []);

    const goToFilas = () => navigate("/Employee");
    const goToHome = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const goToAnchor = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    const handleBackToLogin = () => navigate("/");
    const toggleTheme = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
  };

  return (
    <div className="page">
      <main id="home" className="container">
        <Navbar
          navButton={[
            { label: "Home", onClick: goToHome },
            { label: "Módulos", onClick: () => goToAnchor("modulos") },
            { label: "Sobre", onClick: () => goToAnchor("sobre") },
            { label: "NPS - Relatório", onClick: () => navigate("/Employee") }
          ]}
        />
        

        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Apresentação do Projeto</div>
              <h1 className="title">PsicoSoft – Módulo de Gerenciamento de Filas &amp; NPS</h1>
              <p className="subtitle">
                Otimize o atendimento com filas inteligentes e mensure a satisfação com NPS integrado — simples, visual e acessível.
              </p>
              <div className="hero-actions">
                {/* CTA: vai direto para o módulo de Filas */}
                <button className="btn primary" onClick={goToFilas}>Ir para o Gerenciamento de Filas</button>
                <button className="btn ghost" onClick={() => goToAnchor("modulos")}>Explorar Módulos</button>
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre">

          <div className="grid-2" >
            <div >
             
              <h1 className="title">Reduza filas e atrasos</h1>
              <p className="section-desc">Fila é sinônimo de frustração — tanto para o paciente quanto para a equipe. Cada minuto de espera desnecessária aumenta o estresse, compromete a experiência e reduz a capacidade de atendimento. E a verdade é simples: clínicas que não controlam seu fluxo continuam perdendo tempo, produtividade e pacientes.

É exatamente aí que o nosso sistema entra.

Com um gerenciamento de filas inteligente, sua equipe visualiza em tempo real quem chegou, quem está atrasado, quem aguarda atendimento e quais profissionais estão disponíveis. O fluxo deixa de ser manual e passa a ser totalmente automatizado, eliminando falhas humanas e desorganização.</p>

            </div>
            <div className="card-image">
              <div style={{ height: 480 }}>
                <img src="/image2.png"alt="Mockup do sistema"className="hero-image"/>
              </div>
            </div>
          </div>
            <div>
            <h1 className="title"></h1>
            </div>
          <div className="grid-2 , card">
              <div className="card-image">
                <div style={{ height: 380 }}>
                <img src="/image1.webp"alt="Mockup do sistema"className="hero-image"/>
              </div>

              </div>

              
              
            <div className="">
              <h1 className="title">Reduza filas e atrasos</h1>
              <p className="section-desc">ALGUMA COISA AQUI</p>
              
            </div>
              
            
            
          </div>
        </section>

        {/* MÓDULOS */}
        <section id="modulos">
          <div className="section-head">
            <h2 className="section-title">Módulos</h2>
          </div>

          <div className="grid-2">
            <div className="card">
              <span className="badge">Módulo</span>
              <h3>Gerenciamento de Filas</h3>
              <p className="muted"></p>
              {/* LINK: agora usa navigate para /filas */}
              <button className="link asbtn" onClick={goToFilas}>Ir para o módulo →</button>
            </div>

            <div className="card">
              <span className="badge">Módulo</span>
              <h3>NPS</h3>
              <p className="muted"></p>
              <button className="link asbtn" onClick={goToFilas}>Explorar relatórios →</button>
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria">
          <div className="section-head">
            <h2 className="section-title">Galeria</h2>
            <p className="section-desc">Insira aqui capturas de tela do sistema.</p>
          </div>

          <div className="gallery">
            <div className="shot">[ Screenshot 1 ]</div>
            <div className="shot">[ Screenshot 2 ]</div>
            <div className="shot">[ Screenshot 3 ]</div>
            <div className="shot">[ Screenshot 4 ]</div>
          </div>
        </section>

        {/* TIME */}
        <section id="time">
          <div className="section-head">
            <h2 className="section-title">Time</h2>
            <p className="section-desc">Conheça os envolvidos no projeto.</p>
          </div>

          <div className="grid-4">
            <div className="card member">
              <div className="avatar">
              <img src="/ana.png" alt="Mockup do sistema" className="hero-image"/>
              </div>
              <h3>Ana Beatriz</h3>
              <div className="role"></div>
            </div>

            <div className="card member">
              <div className="avatar"><img src="/yuichi.png" alt="Mockup do sistema" className="hero-image"/></div>
              <h3>Carlos Yuichi</h3>
              <div className="role"></div>
            </div>

            <div className="card member">
              <div className="avatar"><img src="/lucas.png" alt="Mockup do sistema" className="hero-image"/></div>
              <h3>Lucas Eleuterio</h3>
              <div className="role"></div>
            </div>

            <div className="card member">
              <div className="avatar"><img src="/sabrina.png" alt="Mockup do sistema" className="hero-image"/></div>
              <h3>Sabrina Arfelli</h3>
              <div className="role"></div>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato">
          <div className="card">
            <h3>Contato</h3>
            <p className="muted">
              Email: lucaseleuterio95@gmail.com
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div>© {new Date().getFullYear()} PsicoSoft - Módulo de Gerenciamento de Filas &amp; NPS</div>
          <div>
            <span className="muted">Fam - Faculdade das Américas</span> ·{" "}
            <span className="muted">Ciência da Computação </span> ·{" "}
            <span className="muted">8º Semestre</span> ·{" "}
            <span className="muted">Trabalho de Conclusão de Curso</span> ·{" "}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
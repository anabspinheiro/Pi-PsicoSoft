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
            { label: "NPS - Relatório", onClick: () => navigate("/Employee") },
            { label: "Perfil", onClick: () => navigate( "/profile")},
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

          <div className="grid-2 , card" style={{ marginTop: 100 }} >
            <div >
              <h1 className="title">Reduza filas e atrasos</h1>
              <p className="section-desc">Fila é sinônimo de frustração — tanto para o paciente quanto para a equipe. Cada minuto de espera desnecessária aumenta o estresse, compromete a experiência e reduz a capacidade de atendimento. E a verdade é simples: clínicas que não controlam seu fluxo continuam perdendo tempo, produtividade e pacientes.

É exatamente aí que o nosso sistema entra.

Com um gerenciamento de filas inteligente, sua equipe visualiza em tempo real quem chegou, quem está atrasado, quem aguarda atendimento e quais profissionais estão disponíveis. O fluxo deixa de ser manual e passa a ser totalmente automatizado, eliminando falhas humanas e desorganização.</p>

            </div>

            <div className="card-image">
              <div style={{ height: 380 }}>
                <img src="/image1.webp"alt="Mockup do sistema"className="hero-image"/>
              </div>
            </div>
          </div>


          <div className="grid-2" style={{ marginTop: 100 }}>

                        <div className="card-image">
              <div style={{ height: 480 }}>
                <img src="/image4.webp"alt="Mockup do sistema"className="hero-image"/>
              </div>
            </div>

            
            <div >
              <h1 className="title">Uma experiência rápida e humanizada</h1>
              <p className="section-desc"> Quando um paciente entra em uma clínica, ele não busca apenas um atendimento: ele busca acolhimento, clareza e rapidez. Esperar por longos períodos, enfrentar desorganização ou se sentir “perdido” no processo gera ansiedade — e isso afasta o cuidado humanizado que toda clínica deseja oferecer.

Com o nosso sistema, a experiência muda completamente.

A gestão de filas inteligente garante que o paciente seja direcionado rapidamente, sem confusões, sem retrabalhos, sem “para onde eu vou agora?”.
O check-in e a confirmação de presença tornam o fluxo mais simples e ágil, evitando acúmulos e atrasos. O paciente percebe de imediato que o processo funciona, que está sendo acompanhado e que existe organização.

E quando o tempo de espera reduz, algo importante acontece</p>
            </div>

          </div>
          <div className="grid-2 , card" style={{ marginTop: 100 }}>


            <div className="">
              <h1 className="title">Solução completa em uma única plataforma</h1>
              <p className="section-desc">
                Imagine gerenciar filas, medir desempenho, acompanhar o NPS dos pacientes e ter total controle do atendimento — tudo sem precisar abrir vários sistemas, sem confusão, sem perda de tempo. É exatamente isso que nossa plataforma entrega: uma solução totalmente integrada que centraliza tudo o que sua clínica precisa para funcionar de forma rápida, organizada e eficiente.

Com um único sistema, você controla o fluxo de atendimento, visualiza métricas em tempo real, identifica gargalos, entende a satisfação dos pacientes e toma decisões baseadas em dados claros. Tudo conversa entre si, tudo funciona de maneira automatizada e tudo está ao seu alcance em poucos cliques.

Ao unificar processos em uma plataforma única, sua clínica reduz custos, evita erros operacionais, melhora a comunicação interna e entrega uma experiência mais ágil e humanizada para cada paciente que chega até você.

É a tecnologia que elimina o caos e entrega controle total. Uma solução completa, num único lugar, pronta para elevar o nível da sua operação.
</p>
              
            </div>
            <div className="card-image">
              <div style={{ height: 380 }}>
                <img src="/image3.webp"alt="Mockup do sistema"className="hero-image"/>
              </div>
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
             
              <h3>Gerenciamento de Filas</h3>
              <p className="muted">O módulo de filas organiza todo o fluxo de atendimento da clínica em tempo real, mostrando quem está aguardando, o tempo de espera e a ordem de chamada. Ele reduz atrasos, evita aglomerações e otimiza a prioridade dos pacientes de forma automática. Totalmente integrado ao sistema de métricas, oferece uma visão clara da operação e melhora significativamente a experiência do paciente e a eficiência da equipe.</p>
              {/* LINK: agora usa navigate para /filas */}
              <button className="link asbtn" onClick={goToFilas}>Ir para o módulo →</button>
            </div>

            <div className="card">
              
              <h3>NPS</h3>
              <p className="muted">O módulo de NPS coleta automaticamente o nível de satisfação dos pacientes após cada atendimento e transforma essas respostas em indicadores claros de qualidade. Ele identifica pontos fortes, revela gargalos e mostra exatamente onde melhorar. Com relatórios simples e objetivos, a clínica toma decisões rápidas e estratégicas para elevar a experiência do paciente e fortalecer a reputação do serviço.</p>
              <button className="link asbtn" onClick={goToFilas}>Explorar relatórios →</button>
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria">

        </section>

        {/* TIME */}
        <section id="time">
          <div className="section-head">
            <h2 className="section-title">Time</h2>
            <p className="section-title">Conheça os envolvidos no projeto.</p>
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
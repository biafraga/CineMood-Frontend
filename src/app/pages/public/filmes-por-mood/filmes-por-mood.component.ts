import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-filmes-por-mood',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './filmes-por-mood.component.html',
  styleUrls: ['./filmes-por-mood.component.css']
})
export class FilmesPorMoodComponent implements OnInit {
  
  moodId: number = 0;
  moodName: string = '';
  moodColor: string = '';
  filmeSelecionado: any = null;
  filmesDoMood: any[] = [];

  filmes = [
    {
      id: 1,
      titulo: 'Forrest Gump',
      ano: 1994,
      poster: 'assets/forrest_gump.png',
      sinopse: 'Conta a história de um homem com um QI abaixo da média que, por obra do destino, vive eventos importantes da história dos Estados Unidos, como a Guerra do Vietnã e o escândalo de Watergate, enquanto busca viver seu amor por Jenny.',
      frase: 'A vida é como uma caixa de chocolates.',
      elenco: 'Tom Hanks, Robin Wright, Robert Zemeckis',
      moodIds: [1]
    },
    {
      id: 2,
      titulo: 'Soul',
      ano: 2020,
      poster: 'assets/soul.png',
      sinopse: 'Joe é um professor de música do ensino médio apaixonado por jazz, cuja vida não foi como ele esperava. Quando ele viaja a uma outra realidade para ajudar outra pessoa a encontrar sua paixão, ele descobre o verdadeiro sentido da vida.',
      frase: 'Descubra o que faz você ser... você.',
      elenco: 'Jamie Foxx, Tina Fey, Pete Docter',
      moodIds: [1]
    },
    {
      id: 3,
      titulo: 'De Repente 30',
      ano: 2004,
      poster: 'assets/going30.png',
      sinopse: 'Jenna Rink é uma garota que está descontente com sua própria idade. Em seu 13º aniversário, ela faz um pedido: virar adulta. O pedido milagrosamente se torna realidade e, no dia seguinte, Jenna acorda com 30 anos de idade.',
      frase: 'Seja quem você sempre quis ser.',
      elenco: 'Jennifer Garner, Mark Ruffalo, Gary Winick',
      moodIds: [2]
    },
    {
      id: 4,
      titulo: 'O Diabo Veste Prada',
      ano: 2006,
      poster: 'assets/diabo_prada.jpg',
      sinopse: 'Andy é uma jovem que consegue um emprego na renomada "Runway Magazine", a mais importante revista de moda de Nova York. Ela passa a trabalhar como assistente de Miranda Priestly, editora-chefe da revista. Apesar da chance que muitos sonhariam em conseguir, logo Andy nota que trabalhar com Miranda não é tão simples assim.',
      frase: 'O trabalho dos sonhos pode ser um pesadelo.',
      elenco: 'Meryl Streep, Anne Hathaway, David Frankel',
      moodIds: [2]
    },
    {
      id: 5,
      titulo: 'Edward Mãos de Tesoura',
      ano: 1990,
      poster: 'assets/edward.jpg',
      sinopse: 'Peg Boggs é uma vendedora que acidentalmente descobre Edward, jovem que mora sozinho em um castelo no topo de uma montanha, criado por um inventor que morreu antes de dar mãos ao estranho ser, que possui apenas enormes lâminas no lugar delas. Isto o impede de poder se aproximar dos humanos, a não ser para criar revolucionários cortes de cabelos. No entanto, Edward é vítima da sua inocência e, se é amado por uns, é perseguido e usado por outros.',
      frase: 'Um conto moderno de aceitação.',
      elenco: 'Johnny Depp, Winona Ryder, Tim Burton',
      moodIds: [2]
    },
    {
      id: 6,
      titulo: 'Um Sonho de Liberdade',
      ano: 1994,
      poster: 'assets/sonho_liberdade.jpg',
      sinopse: 'Em 1947, o jovem banqueiro Andy Dufresne é condenado à prisão perpétua pelo assassinato de sua esposa e do amante dela. No entanto, apenas Andy sabe que não cometeu os crimes. Encarcerado em Shawshank, a penitenciária mais rigorosa do estado do Maine, ele faz amizade com Ellis Boyd "Red" Redding, um homem desiludido que está preso há 20 anos.',
      frase: 'A esperança é uma coisa perigosa.',
      elenco: 'Tim Robbins, Morgan Freeman, Frank Darabont',
      moodIds: [3]
    },
    {
      id: 7,
      titulo: 'Estrelas Além do Tempo',
      ano: 2016,
      poster: 'assets/estrelas.png',
      sinopse: 'No auge da corrida espacial travada entre Estados Unidos e União Soviética durante a Guerra Fria, uma equipe de cientistas da Nasa formada exclusivamente por mulheres afro-americanas provou ser o elemento crucial que faltava na equação para a vitória dos Estados Unidos, liderando uma das maiores operações tecnológicas registradas na história norte-americana.',
      frase: 'Inteligência não tem cor nem gênero.',
      elenco: 'Taraji P. Henson, Octavia Spencer, Theodore Melfi',
      moodIds: [3]
    },
    {
      id: 8,
      titulo: 'À Procura da Felicidade',
      ano: 2006,
      poster: 'assets/procura_felicidade.png',
      sinopse: 'Chris enfrenta sérios problemas financeiros e sua esposa, Linda, decide partir. Agora solteiro, ele precisa cuidar de Christopher, seu filho de cinco anos. Chris tenta usar sua habilidade como vendedor para conseguir um emprego melhor, mas só consegue um estágio não-remunerado. Seus problemas financeiros não podem esperar uma promoção e eles acabam despejados. Chris e Christopher passam a dormir em abrigos ou onde quer que consigam um refúgio, mantendo a esperança de que dias melhores virão.',
      frase: 'Nunca desista dos seus sonhos.',
      elenco: 'Will Smith, Jaden Smith, Gabriele Muccino',
      moodIds: [3]
    },
    {
      id: 9,
      titulo: 'Matrix',
      ano: 1999,
      poster: 'assets/matrix.png',
      sinopse: 'O jovem programador Thomas Anderson é atormentado por estranhos pesadelos em que está sempre conectado por cabos a um imenso sistema de computadores do futuro. À medida que o sonho se repete, ele começa a desconfiar da realidade. Thomas conhece os misteriosos Morpheus e Trinity e descobre que é vítima de um sistema inteligente e artificial chamado Matrix, que manipula a mente das pessoas e cria a ilusão de um mundo real enquanto usa os cérebros e corpos dos indivíduos para produzir energia.',
      frase: 'Eu só posso lhe mostrar a porta. Você tem que atravessá-la.',
      elenco: 'Keanu Reeves, Lana Wachowski, Lilly Wachowski',
      moodIds: [4]
    },
    {
      id: 10,
      titulo: 'Kill Bill: Volume 1',
      ano: 2003,
      poster: 'assets/kill_bill.png',
      sinopse: 'A ex-assassina conhecida apenas como Noiva acorda de um coma de quatro anos decidida a se vingar de Bill, seu ex-amante e chefe, que tentou matá-la no dia do casamento. Ela está motivada a acertar as contas com cada uma das pessoas envolvidas com a perda da filha, da festa de casamento e dos quatro anos de sua vida. Na jornada, a Noiva é submetida a dores físicas agonizantes ao enfrentar a inescrupulosa gangue de Bill, o Esquadrão Assassino de Víboras Mortais.',
      frase: 'A vingança é doce.',
      elenco: 'Uma Thurman, Lucy Liu, Quentin Tarantino',
      moodIds: [4]
    },
    {
      id: 11,
      titulo: 'Pecadores',
      ano: 2025,
      poster: 'assets/pecadores.png',
      sinopse: 'Dois irmãos gêmeos tentam deixar suas vidas problemáticas para trás e retornam à sua cidade natal para recomeçar. Lá, eles descobrem que um mal ainda maior está à espreita para recebê-los de volta.',
      frase: 'Se continuar dançando com o diabo, um dia ele te seguirá até em casa.',
      elenco: 'Michael B. Jordan, Hailee Steinfeld, Ryan Coogler',
      moodIds: [4]
    },
    {
      id: 12,
      titulo: 'Parasita',
      ano: 2019,
      poster: 'assets/parasita.png',
      sinopse: 'Toda a família de Ki-taek está desempregada, vivendo em um porão sujo e apertado. Por obra do acaso, ele começa a dar aulas de inglês para uma garota de família rica. Fascinados com a vida luxuosa destas pessoas, pai, mãe e filhos bolam um plano para se infiltrar também na abastada família, um a um. No entanto, os segredos e mentiras necessários à ascensão social cobram o seu preço.',
      frase: 'O rico e o pobre sob o mesmo teto.',
      elenco: 'Song Kang-ho, Cho Yeo-jeong, Bong Joon-ho',
      moodIds: [5]
    },
    {
      id: 13,
      titulo: 'Histórias Cruzadas',
      ano: 2011,
      poster: 'assets/historias_cruzadas.png',
      sinopse: 'Nos anos 60, no Mississippi, Skeeter é uma garota da alta sociedade que retorna determinada a se tornar escritora. Ela começa a entrevistar as mulheres negras da cidade, que deixaram suas vidas para trabalhar na criação dos filhos da elite branca, da qual a própria Skeeter faz parte. Aibileen Clark, a emprega da melhor amiga de Skeeter, é a primeira a conceder uma entrevista. Apesar das críticas, Skeeter e Aibileen continuam trabalhando juntas e, aos poucos, conseguem novas adesões.',
      frase: 'Mudança começa com coragem.',
      elenco: 'Viola Davis, Emma Stone, Tate Taylor',
      moodIds: [5]
    },
    {
      id: 14,
      titulo: 'Cidade de Deus',
      ano: 2002,
      poster: 'assets/cdd.png',
      sinopse: 'Buscapé é um jovem pobre, negro e sensível, que cresce em um universo de muita violência. Ele vive na Cidade de Deus, favela carioca conhecida por ser um dos locais mais violentos do Rio. Amedrontado com a possibilidade de se tornar um bandido, é salvo de seu destino por causa de seu talento como fotógrafo, que permite que siga carreira na profissão. É por meio de seu olhar atrás da câmera que ele analisa o dia a dia da favela em que vive, onde a violência aparenta não ter fim.',
      frase: 'Se correr o bicho pega, se ficar o bicho come.',
      elenco: 'Alexandre Rodrigues, Alice Braga, Fernando Meirelles',
      moodIds: [5]
    },
    {
      id: 15,
      titulo: 'Não Olhe para Cima',
      ano: 2021,
      poster: 'assets/não_olhe_para_cima.png',
      sinopse: 'Dois astrônomos medíocres descobrem que em poucos meses um meteorito destruirá o planeta Terra. A partir desse momento, eles devem alertar a humanidade por meio da imprensa sobre o perigo que se aproxima.',
      frase: 'Olhar para cima pode salvar vidas.',
      elenco: 'Leonardo DiCaprio, Jennifer Lawrence, Adam McKay',
      moodIds: [5]
    },
    {
      id: 16,
      titulo: 'Os Suspeitos',
      ano: 2013,
      poster: 'assets/suspeitos.png',
      sinopse: 'Depois que sua filha de seis anos e uma amiga dela são sequestradas, Keller Dove, um carpinteiro de Boston, enfrenta o departamento de polícia e o jovem detetive encarregado do caso para fazer justiça com as próprias mãos.',
      frase: 'Até onde você iria por justiça?',
      elenco: 'Hugh Jackman, Jake Gyllenhaal, Denis Villeneuve',
      moodIds: [6]
    },
    {
      id: 17,
      titulo: 'Amnésia',
      ano: 2000,
      poster: 'assets/amnesia.png',
      sinopse: 'Leonard está caçando o homem que estuprou e matou sua esposa. Ele tem dificuldades em encontrar o assassino pois sofre de uma forma intratável de perda de memória. Mesmo que ele possa lembrar detalhes da vida antes do acidente, Leonard não consegue lembrar o que aconteceu quinze minutos atrás, onde está indo ou a razão.',
      frase: 'Lembre-se de esquecer.',
      elenco: 'Guy Pearce, Carrie-Anne Moss, Christopher Nolan',
      moodIds: [6]
    },
    {
      id: 18,
      titulo: 'Oldboy',
      ano: 2003,
      poster: 'assets/oldboy.png',
      sinopse: 'Dae-Su é raptado e mantido em cativeiro por 15 anos num quarto de hotel, sem qualquer contato com o mundo externo. Quando ele é inexplicavelmente solto, descobre que é acusado pelo assassinato da esposa e embarca numa missão obsessiva por vingança.',
      frase: 'A vingança nunca é simples.',
      elenco: 'Choi Min-sik, Yoo Ji-tae, Park Chan-wook',
      moodIds: [6]
    },
    {
      id: 19,
      titulo: 'A Viagem de Chihiro',
      ano: 2001,
      poster: 'assets/chiriro.png',
      sinopse: 'Chihiro e seus pais estão se mudando para uma cidade diferente. A caminho da nova casa, o pai decide pegar um atalho. Eles se deparam com uma mesa repleta de comida, embora ninguém esteja por perto. Chihiro sente o perigo, mas seus pais começam a comer. Quando anoitece, eles se transformam em porcos. Agora, apenas Chihiro pode salvá-los.',
      frase: 'Um conto mágico inesquecível.',
      elenco: 'Rumi Hiiragi, Miyu Irino, Hayao Miyazaki',
      moodIds: [7]
    },
    {
      id: 20,
      titulo: 'O Fabuloso Destino de Amélie Poulain',
      ano: 2001,
      poster: 'assets/amelie.png',
      sinopse: 'Amélie é uma jovem do interior que se muda para Paris e logo começa a trabalhar em um café. Num belo dia, ela encontra uma caixinha dentro de seu apartamento e decide procurar o dono. A partir daí, sua perspectiva de vida muda radicalmente.',
      frase: 'Ela vai mudar sua vida.',
      elenco: 'Audrey Tautou, Mathieu Kassovitz, Jean-Pierre Jeunet',
      moodIds: [7]
    },
    {
      id: 21,
      titulo: 'À Espera de um Milagre',
      ano: 1999,
      poster: 'assets/espera_milagre.jpg',
      sinopse: 'Um carcereiro tem um relacionamento incomum e comovente com um preso que está no corredor na morte: Coffey, um negro enorme, condenado por ter matado brutalmente duas gêmeas de nove anos. Ele tem tamanho e força para matar qualquer um, mas seu comportamento é completamente oposto à sua aparência. Além de ser simples, ingênuo e ter pavor do escuro, ele possui um dom sobrenatural. Com o passar do tempo, o carcereiro aprende que, às vezes, os milagres acontecem nos lugares mais inesperados.',
      frase: 'Milagres podem acontecer em qualquer lugar.',
      elenco: 'Tom Hanks, Michael Clarke Duncan, Frank Darabont',
      moodIds: [7]
    },
    {
      id: 22,
      titulo: 'A Mentira',
      ano: 2010,
      poster: 'assets/mentira.jpg',
      sinopse: 'Estimulada pela popular melhor amiga a revelar detalhes de seu fim de semana entediante, Olive, uma adolescente certinha, decide apimentar um pouco os detalhes contando uma pequena mentira sobre a perda de sua virgindade. Quando a bisbilhoteira da escola ouve a conversa e espalha para todo o campus, Olive fica famosa repentinamente, mas pelas razões erradas.',
      frase: 'Toda mentira tem um preço.',
      elenco: 'Emma Stone, Penn Badgley, Will Gluck',
      moodIds: [8]
    },
    {
      id: 23,
      titulo: 'Escola de Rock',
      ano: 2003,
      poster: 'assets/escola_rock.jpg',
      sinopse: 'Um músico desempregado, Dewey Finn se passa por professor substituto em uma escola rigorosa. Descobre talentos musicais entre os alunos e secretamente forma uma banda com eles, transformando suas vidas enquanto esconde a verdade dos pais e diretores.',
      frase: 'A sala de aula mais rock n roll de todas.',
      elenco: 'Jack Black, Joan Cusack, Richard Linklater',
      moodIds: [8]
    },
    {
      id: 24,
      titulo: 'Fallen Angels',
      ano: 1995,
      poster: 'assets/fallen_angels.png',
      sinopse: 'Um matador de aluguel, desiludido e cansado da vida que leva, embarca no seu último trabalho e depara-se com os sentimentos de atração e desejo pela sua sexy parceira, que ele raramente vê. Pela noite de Hong-Kong, tomado pelas dúvidas sobre se é ou não correto envolver-se com a parceira, ele conhece um rapaz mudo, que vive a sua vida noturna assaltando lojas e fazendo-se passar pelos proprietários.',
      frase: 'Um clássico do cinema de Wong Kar-Wai.',
      elenco: 'Takeshi Kaneshiro, Charlie Yeung, Wong Kar-wai',
      moodIds: [9]
    },
    {
      id: 25,
      titulo: 'Memórias de uma Gueixa',
      ano: 2005,
      poster: 'assets/gueixa.jpg',
      sinopse: 'Chiyo foi vendida a uma casa de gueixas quando ainda era menina, em 1929, onde é maltratada pelos donos e por Hatsumomo, uma gueixa que tem inveja de sua beleza. Acolhida por Mameha, a principal rival de Hatsumomo, Chiyo ao crescer se torna a gueixa Sayuri. Reconhecida, ela passa a desfrutar de uma sociedade repleta de riquezas e privilégios até que a 2ª Guerra Mundial modifica radicalmente sua realidade no Japão.',
      frase: 'A beleza pode ser uma arma.',
      elenco: 'Zhang Ziyi, Ken Watanabe, Rob Marshall',
      moodIds: [9]
    }
  ];

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.moodId = Number(params.get('id'));
      this.configurarMood();
      this.filtrarFilmes();
    });
  }

  configurarMood() {
    switch(this.moodId) {
      case 1: this.moodName = 'Otimista'; this.moodColor = '#F7D774'; break;
      case 2: this.moodName = 'Nostálgico'; this.moodColor = '#F4B5C5'; break;
      case 3: this.moodName = 'Inspirado'; this.moodColor = '#50EFE7'; break;
      case 4: this.moodName = 'Empolgado'; this.moodColor = '#FF9F68'; break;
      case 5: this.moodName = 'Reflexivo'; this.moodColor = '#8C5CFF'; break;
      case 6: this.moodName = 'Surpreso'; this.moodColor = '#b1f72fff'; break;
      case 7: this.moodName = 'Emocionado'; this.moodColor = '#FF6B6B'; break;
      case 8: this.moodName = 'Despreocupado'; this.moodColor = '#74B9FF'; break;
      case 9: this.moodName = 'Diferentão'; this.moodColor = '#87ec5bff'; break;
      default: this.moodName = 'Mood'; this.moodColor = '#fff';
    }
  }

  filtrarFilmes() {
    this.filmesDoMood = this.filmes.filter(f => f.moodIds.includes(this.moodId));
  }

  voltar() {
    this.location.back();
  }

  abrirModal(filme: any) {
    this.filmeSelecionado = filme;
  }

  fecharModal() {
    this.filmeSelecionado = null;
  }
}
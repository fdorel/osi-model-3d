/**
 * OSI Model Data — All 7 layers with protocols, functions, and metadata.
 */

export const OSI_LAYERS = [
  {
    id: 7,
    name: "APPLICATION",
    shortName: "APP",
    color: "#ff4d6d",
    colorRGB: "255,77,109",
    icon: "🖥️",
    description: "Provides network services directly to end-user applications and processes.",
    functions: [
      "Provides network services directly to application software (HTTP, FTP, SMTP)",
      "Defines APIs for service access — the bridge between user and network",
      "Handles communication partner identification and resource availability",
      "Manages user authentication, authorization, and session negotiation"
    ],
    protocols: [
      { name: "HTTP",   full: "HyperText Transfer Protocol",         desc: "Web browser ↔ server communication. Port 80.", port: "80" },
      { name: "HTTPS",  full: "HTTP Secure",                         desc: "Encrypted web traffic via TLS/SSL. Port 443.", port: "443" },
      { name: "FTP",    full: "File Transfer Protocol",              desc: "Bidirectional file exchange between systems.", port: "20/21" },
      { name: "SMTP",   full: "Simple Mail Transfer Protocol",        desc: "Email transmission protocol between mail servers.", port: "25" },
      { name: "DNS",    full: "Domain Name System",                  desc: "Resolves human-readable domain names to IP addresses.", port: "53/UDP" },
      { name: "SSH",    full: "Secure Shell",                        desc: "Encrypted remote login, command execution, and tunneling.", port: "22" },
      { name: "Telnet", full: "Teletype Network Protocol",            desc: "Unencrypted terminal emulation over TCP/IP.", port: "23" },
      { name: "SNMP",   full: "Simple Network Management Protocol",  desc: "Monitoring and configuration of network devices.", port: "161/UDP" },
      { name: "DHCP",   full: "Dynamic Host Configuration Protocol", desc: "Auto-assigns IP addresses to devices on a network.", port: "67/68/UDP" }
    ]
  },
  {
    id: 6,
    name: "PRESENTATION",
    shortName: "PRES",
    color: "#ff9f1c",
    colorRGB: "255,159,28",
    icon: "🎨",
    description: "Translates, encrypts, and compresses data for application-layer consumption.",
    functions: [
      "Translates data between the application and network formats (encoding/decoding)",
      "Handles data encryption and decryption for secure transmission",
      "Manages data compression and decompression to reduce bandwidth",
      "Ensures syntax compatibility across heterogeneous systems"
    ],
    protocols: [
      { name: "TLS/SSL",  full: "Transport Layer Security / SSL",     desc: "Cryptographic protocol securing communications over a network." },
      { name: "TLS 1.3",  full: "TLS Version 1.3",                    desc: "Latest TLS standard — faster handshake, removed weak ciphers." },
      { name: "JPEG",     full: "Joint Photographic Experts Group",   desc: "Lossy compression standard for photographic images." },
      { name: "MPEG-4",   full: "Moving Picture Experts Group",       desc: "Video and audio codec standard (MP4, AAC)." },
      { name: "ASCII",    full: "American Standard Code for IT",      desc: "7-bit character encoding. Foundation of text representation." },
      { name: "UTF-8",    full: "Unicode Transformation Format",       desc: "Variable-width 8-bit encoding. Supports all Unicode characters." },
      { name: "GIF",      full: "Graphics Interchange Format",         desc: "8-bit color image format with animation and transparency support." },
      { name: "PNG",      full: "Portable Network Graphics",           desc: "Lossless compression raster graphic format. Supports alpha channel." }
    ]
  },
  {
    id: 5,
    name: "SESSION",
    shortName: "SESS",
    color: "#06d6a0",
    colorRGB: "6,214,160",
    icon: "🔗",
    description: "Establishes, manages, and terminates communication sessions between applications.",
    functions: [
      "Establishes, maintains, and gracefully terminates sessions between peers",
      "Synchronizes data exchange using checkpoints for recovery",
      "Manages dialog control — half-duplex or full-duplex communication modes",
      "Handles session recovery after network failures or interruptions"
    ],
    protocols: [
      { name: "NetBIOS",  full: "Network Basic Input/Output System",     desc: "Session protocol for LAN file/print sharing and name resolution." },
      { name: "SIP",      full: "Session Initiation Protocol",            desc: "Signaling protocol for initiating VoIP, video, and messaging sessions." },
      { name: "SOAP",     full: "Simple Object Access Protocol",          desc: "XML-based messaging protocol for web services (REST alternative)." },
      { name: "NFS",      full: "Network File System",                    desc: "Distributed file system by Sun Microsystems. Allows remote file access." },
      { name: "RPC",      full: "Remote Procedure Call",                  desc: "Calls functions on remote systems as if local. Foundation of microservices." },
      { name: "DSP",      full: "Session Description Protocol",           desc: "Describes multimedia communication sessions for negotiation (SDP)." }
    ]
  },
  {
    id: 4,
    name: "TRANSPORT",
    shortName: "TRANS",
    color: "#00d4ff",
    colorRGB: "0,212,255",
    icon: "📦",
    description: "Provides end-to-end communication, segmentation, flow control, and reliability.",
    functions: [
      "Segmentation and reassembly of application data into manageable chunks",
      "End-to-end error detection, acknowledgment, and recovery (TCP)",
      "Flow control between source and destination to prevent overflow",
      "Port-based multiplexing/demultiplexing — delivers data to correct application"
    ],
    protocols: [
      { name: "TCP",   full: "Transmission Control Protocol",           desc: "Connection-oriented, reliable delivery. 3-way handshake (SYN/ACK/FIN). Sequence numbers ensure order." },
      { name: "UDP",   full: "User Datagram Protocol",                   desc: "Connectionless, fastest transport. No ACKs. Used by DNS, streaming, VoIP, gaming." },
      { name: "SCTP",  full: "Stream Control Transmission Protocol",     desc: "Message-oriented with multi-streaming and multi-homing. Combines TCP+UDP features." },
      { name: "DCCP",  full: "Datagram Congestion Control Protocol",     desc: "Congestion-controlled unreliable transport for real-time media streaming." }
    ]
  },
  {
    id: 3,
    name: "NETWORK",
    shortName: "NET",
    color: "#7b2fff",
    colorRGB: "123,47,255",
    icon: "🌐",
    description: "Handles logical addressing, routing across multiple networks, and path selection.",
    functions: [
      "Logical addressing — IP addresses uniquely identify hosts on internetworks",
      "Routing: finding the best path across multiple network segments using algorithms",
      "Fragmentation of large packets to fit MTU constraints of underlying links",
      "Internetworking, congestion control, and quality of service (QoS) management"
    ],
    protocols: [
      { name: "IPv4",   full: "Internet Protocol Version 4",             desc: "32-bit addressing scheme. ~4.3 billion unique addresses. Dotted-decimal notation." },
      { name: "IPv6",   full: "Internet Protocol Version 6",              desc: "128-bit addressing. 340 undecillion addresses. Solves IPv4 exhaustion completely." },
      { name: "ICMP",   full: "Internet Control Message Protocol",        desc: "Error reporting and diagnostics. Powers ping (echo request/reply) and traceroute." },
      { name: "ARP",    full: "Address Resolution Protocol",              desc: "Maps a known IP address to its physical MAC address on the local network segment." },
      { name: "RIP",    full: "Routing Information Protocol",             desc: "Distance-vector routing. Uses hop count. Max 15 hops. Simple but slow convergence." },
      { name: "OSPF",   full: "Open Shortest Path First",                 desc: "Link-state routing using Dijkstra's algorithm. Fast convergence for large networks." },
      { name: "BGP",    full: "Border Gateway Protocol",                  desc: "Exterior gateway protocol. Routes between autonomous systems on the internet backbone." },
      { name: "IGMP",   full: "Internet Group Management Protocol",       desc: "Manages multicast group memberships for efficient one-to-many communication." }
    ]
  },
  {
    id: 2,
    name: "DATA LINK",
    shortName: "DLLK",
    color: "#3a7bd5",
    colorRGB: "58,123,213",
    icon: "🔗",
    description: "Provides node-to-node delivery, framing, error detection, and media access control.",
    functions: [
      "Framing: packaging raw bits into structured frames with headers and trailers",
      "Physical addressing using 48-bit MAC addresses burned into NIC hardware",
      "Error detection using CRC (Cyclic Redundancy Check) in frame trailers",
      "Media Access Control: CSMA/CD for wired, CSMA/CA for wireless networks"
    ],
    protocols: [
      { name: "Ethernet II",  full: "IEEE 802.3 Frame Format",           desc: "Most ubiquitous LAN framing. Dest/src MAC + EtherType. MTU 1500 bytes." },
      { name: "PPP",          full: "Point-to-Point Protocol",            desc: "Direct serial link encapsulation. Supports authentication (PAP/CHAP)." },
      { name: "VLAN (802.1Q)",full: "Virtual LAN Tagging",                 desc: "Adds 4-byte tag to Ethernet frames for network segmentation across switches." },
      { name: "MAC",          full: "Media Access Control Sublayer",       desc: "48-bit (6-byte) hardware address. OUI prefix identifies manufacturer." },
      { name: "Frame Relay",  full: "X.75 Frame Relay",                   desc: "Packet-switched WAN protocol. Uses virtual circuits (DLCI). Legacy but influential." },
      { name: "Wi-Fi",        full: "IEEE 802.11 Family",                 desc: "Wireless LAN standard family — 802.11a/b/g/n/ac/ax (WiFi 6E). CSMA/CA medium access." }
    ]
  },
  {
    id: 1,
    name: "PHYSICAL",
    shortName: "PHY",
    color: "#ff006e",
    colorRGB: "255,0,110",
    icon: "⚡",
    description: "Transmits raw bit streams over physical media using electrical, optical, or radio signals.",
    functions: [
      "Converts digital bits (0/1) into electrical, optical, or electromagnetic signals",
      "Defines physical connectors, pinouts, and cable specifications (RJ45, LC, SC)",
      "Manages bit timing, synchronization, and clock recovery at the receiver",
      "Handles signal encoding schemes: Manchester, 8b/10b, PAM-4 for high-speed links"
    ],
    protocols: [
      { name: "Ethernet PHY",   full: "IEEE 802.3 Physical Layer",       desc: "Copper (Twisted Pair Cat5e/6/6a) and fiber optic signaling standards." },
      { name: "DSL",            full: "Digital Subscriber Line (ADSL/VDSL)",desc: "High-speed over existing telephone lines using DSP modulation." },
      { name: "SONET/SDH",      full: "Synchronous Optical Networking",   desc: "Fiber optic carrier standard. STS-3c carries OC-3 at 622 Mbps baseline." },
      { name: "Coaxial Cable",  full: "IEEE 802.14 (DOCSIS)",             desc: "Broadband transmission over coaxial cable. Used by cable ISPs." },
      { name: "Fiber Optic",    full: "Single-mode / Multi-mode Fiber",   desc: "Light-pulse transmission. SMF for long-haul, MMF for campus backbone." },
      { name: "Radio/Wireless", full: "RF Spectrum (2.4/5/6 GHz)",         desc: "Wi-Fi, Bluetooth, cellular — electromagnetic wave modulation techniques." }
    ]
  }
];

// Helper: get layer by ID
export function getLayer(id) {
  return OSI_LAYERS.find(l => l.id === id);
}

// Helper: get all protocol names flattened with layer info
export function getAllProtocols() {
  return OSI_LAYERS.flatMap(layer =>
    layer.protocols.map(p => ({ ...p, layerId: layer.id, layerName: layer.name, color: layer.color }))
  );
}

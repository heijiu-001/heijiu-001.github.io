const portfolio = {
  profileLinks: [
    { label: "GitHub", href: "https://github.com/heijiu-001", external: true },
    { label: "邮箱", href: "mailto:15956204795@163.com" },
    { label: "简历整理中", href: "", disabled: true },
  ],
  projects: [
    {
      title: "智能跑马灯远程控制系统",
      description: "基于 OpenHarmony 与星闪 NearLink 的智能跑马灯远程控制系统，覆盖设备端、华为云和鸿蒙应用的端云一体化控制链路。",
      tags: ["OpenHarmony", "星闪 NearLink", "华为云 IoT", "MQTT", "ArkTS"],
      role: "设备端、云端接入与鸿蒙控制端协同开发",
      challenge: "连接近端控制、云端鉴权与设备状态同步",
      result: "完成设备控制、状态上报和云端指令下发的完整链路",
    },
    {
      title: "鸿蒙控制 APP",
      description: "使用 ArkTS 与 ArkUI 构建的鸿蒙控制端应用，提供远程开关、灯效模式切换与设备状态展示。",
      tags: ["ArkTS", "ArkUI", "DevEco Studio", "华为云"],
      role: "鸿蒙应用界面与云端通信对接",
      challenge: "将设备状态变化及时呈现在移动端界面",
      result: "完成华为云 IoT 平台鉴权与通信流程对接",
    },
    {
      title: "华为云 IoT 设备接入方案",
      description: "面向设备接入的云端配置方案，覆盖产品与设备创建、物模型定义、MQTT 参数配置及上下行通信。",
      tags: ["华为云 IoT", "MQTT", "物模型", "设备接入"],
      role: "云端产品模型与设备通信配置",
      challenge: "排查设备离线与通信不稳定问题",
      result: "建立可复用的设备数据上报与指令下发流程",
    },
  ],
  software: [
    {
      name: "鸿蒙控制 APP",
      platform: "HarmonyOS",
      status: "coming-soon",
      version: "准备中",
      publishedAt: "待发布",
      description: "用于远程控制智能跑马灯的鸿蒙应用。首个公开测试版本将通过 GitHub Releases 提供。",
      requirements: "HarmonyOS 设备；具体系统版本将在首次发布时说明",
      checksum: "将在发布时提供 SHA-256",
      repositoryUrl: "",
      releaseUrl: "",
      releaseNotes: "目前正在完善稳定性与发布说明。",
    },
  ],
  about: [
    { title: "方向", items: ["鸿蒙应用开发（ArkTS + ArkUI）", "物联网端云一体化（华为云 IoT + MQTT）", "嵌入式开发（Hi3863、GPIO、C）"] },
    { title: "技术栈", items: ["HarmonyOS / OpenHarmony", "DevEco Studio", "华为云 IoT 平台", "星闪 NearLink", "MQTT 协议", "React / Tailwind CSS"] },
    { title: "兴趣", items: ["智能硬件与物联网", "端云协同架构", "开源鸿蒙生态"] },
  ],
};

function createExternalLink(label, href, className = "text-link") {
  const link = document.createElement("a");
  link.className = className;
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  return link;
}

function renderProfileLinks() {
  const container = document.querySelector("#profile-links");
  portfolio.profileLinks.forEach((item) => {
    if (item.disabled) {
      const note = document.createElement("span");
      note.className = "button-disabled";
      note.setAttribute("aria-disabled", "true");
      note.textContent = item.label;
      container.append(note);
      return;
    }
    const link = document.createElement("a");
    link.className = "button";
    link.href = item.href;
    link.textContent = item.label;
    if (item.external) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    container.append(link);
  });
}

function renderProjects() {
  const container = document.querySelector("#project-list");
  portfolio.projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const content = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = project.title;
    const description = document.createElement("p");
    description.textContent = project.description;
    const tags = document.createElement("ul");
    tags.className = "tags";
    project.tags.forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.textContent = tag;
      tags.append(tagItem);
    });
    content.append(title, description, tags);

    if (project.repositoryUrl || project.liveUrl) {
      const links = document.createElement("div");
      links.className = "project-links";
      if (project.repositoryUrl) links.append(createExternalLink("查看源码", project.repositoryUrl));
      if (project.liveUrl) links.append(createExternalLink("在线体验", project.liveUrl));
      content.append(links);
    } else {
      const note = document.createElement("p");
      note.className = "muted-note";
      note.textContent = "项目资料与公开仓库正在整理中。";
      content.append(note);
    }

    const proof = document.createElement("dl");
    proof.className = "project-proof";
    [["职责", project.role], ["难点", project.challenge], ["成果", project.result]].forEach(([label, value]) => {
      const term = document.createElement("dt");
      term.textContent = label;
      const detail = document.createElement("dd");
      detail.textContent = value;
      proof.append(term, detail);
    });
    card.append(content, proof);
    container.append(card);
  });
}

function renderSoftware() {
  const container = document.querySelector("#software-list");
  portfolio.software.forEach((software) => {
    const card = document.createElement("article");
    card.className = "software-card";
    const title = document.createElement("h3");
    title.textContent = software.name;
    const description = document.createElement("p");
    description.textContent = software.description;
    const notes = document.createElement("p");
    notes.className = "muted-note";
    notes.textContent = software.releaseNotes;

    const meta = document.createElement("dl");
    meta.className = "software-meta";
    [["平台", software.platform], ["版本", software.version], ["发布日期", software.publishedAt], ["系统要求", software.requirements], ["SHA-256", software.checksum]].forEach(([label, value]) => {
      const item = document.createElement("div");
      const term = document.createElement("dt");
      term.textContent = label;
      const detail = document.createElement("dd");
      detail.textContent = value;
      item.append(term, detail);
      meta.append(item);
    });

    const actions = document.createElement("div");
    actions.className = "release-actions";
    if (software.status === "published" && software.releaseUrl) {
      actions.append(createExternalLink("直接下载", software.releaseUrl, "button button-primary"));
    } else {
      const disabled = document.createElement("span");
      disabled.className = "button-disabled";
      disabled.setAttribute("aria-disabled", "true");
      disabled.textContent = "即将发布";
      actions.append(disabled);
    }
    if (software.repositoryUrl) actions.append(createExternalLink("查看源码", software.repositoryUrl, "button"));
    card.append(title, description, notes, meta, actions);
    container.append(card);
  });
}

function renderAbout() {
  const container = document.querySelector("#about-list");
  portfolio.about.forEach((group) => {
    const section = document.createElement("section");
    const title = document.createElement("h3");
    title.textContent = group.title;
    const list = document.createElement("ul");
    group.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.append(listItem);
    });
    section.append(title, list);
    container.append(section);
  });
}

renderProfileLinks();
renderProjects();
renderSoftware();
renderAbout();
